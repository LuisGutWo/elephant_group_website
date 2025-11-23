import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Form as RBForm,
  Button,
  Alert,
  ProgressBar,
  Modal,
} from "react-bootstrap";
import { FaWhatsapp, FaEye, FaCheckCircle } from "react-icons/fa";
import ContactInfoFields from "./ContactInfoFields";
import ProductDetailsFields from "./ProductDetailsFields";
import FileUploadField from "./FileUploadField";
import { useFormValidation } from "@/utils/hooks/useFormValidation";
import { useFileUpload } from "@/utils/hooks/useFileUpload";
import { useAutoSave } from "@/utils/hooks/useAutoSave";
import {
  sanitizeInput,
  formatPhoneNumber,
  calculateProgress,
  generateWhatsAppMessage,
  fetchWithRetry,
  loadFromLocalStorage,
} from "@/utils/formHelpers";
import EMAIL_API from "@/config/emailApi";

// Constantes fuera del componente para evitar recreación
const PRODUCT_TYPES = [
  { value: "impreso", label: "Impreso" },
  { value: "textil", label: "Textil" },
  { value: "packaging", label: "Packaging" },
];

const PRODUCTS_BY_TYPE = {
  impreso: [
    "Volantes",
    "Brochure",
    "Afiche",
    "Tarjeta de presentación",
    "Sticker",
    "Calendario",
    "Carpeta",
    "Otros",
  ],
  textil: ["Polera", "Gorro", "Bolsa"],
  packaging: ["Caja", "Etiqueta", "Envelope"],
};

const MATERIALS = ["Papel couchê", "Cartulina", "Vinilo", "Algodón"];
const SIZES = Array.from({ length: 40 }, (_, i) => (i + 1) * 5); // 5,10,...200 cm
const QUANTITIES = Array.from({ length: 100 }, (_, i) => i + 1);

function Form() {
  // Estados principales del formulario
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const [details, setDetails] = useState({
    productType: "",
    product: "",
    material: "",
    width: "",
    height: "",
    quantity: 1,
    fileName: "",
    fileData: null,
    deliveryDate: "",
    comments: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // Hooks personalizados
  const {
    errors,
    touched,
    validateField,
    handleBlur,
    validateAll,
    clearAllErrors,
    focusFirstError,
  } = useFormValidation();

  const {
    fileDetails,
    fileError,
    isProcessing,
    handleFileSelect,
    processFile,
    clearFile,
  } = useFileUpload();

  // Auto-guardar en localStorage
  const { clearSaved } = useAutoSave("quotation-draft", form, details, true);

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedData = loadFromLocalStorage("quotation-draft");
    if (savedData) {
      if (savedData.form) setForm(savedData.form);
      if (savedData.details) {
        setDetails((prev) => ({
          ...prev,
          ...savedData.details,
          fileData: null, // No cargar archivo (muy pesado)
        }));
      }
      console.log("📥 Datos del formulario recuperados");
    }

    return () => {
      // Cleanup function
    };
  }, []);

  // Calcular progreso del formulario
  const progress = useMemo(
    () => calculateProgress(form, details),
    [form, details]
  );

  // Usar constantes definidas fuera del componente

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      let sanitizedValue = sanitizeInput(value);

      // Formatear teléfono automáticamente
      if (name === "phone") {
        sanitizedValue = formatPhoneNumber(value);
      }

      setForm((s) => ({ ...s, [name]: sanitizedValue }));

      // Validar campo si ya fue tocado
      if (touched[name]) {
        validateField(name, sanitizedValue, {
          ...form,
          [name]: sanitizedValue,
        });
      }
    },
    [touched, validateField, form]
  );

  const handleDetailChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const sanitizedValue = sanitizeInput(value);

      setDetails((d) => {
        // Si cambia el tipo de producto, limpiar el producto específico seleccionado
        if (name === "productType") {
          return { ...d, [name]: sanitizedValue, product: "" };
        }
        return { ...d, [name]: sanitizedValue };
      });

      // Validar campo si ya fue tocado
      if (touched[name]) {
        validateField(name, sanitizedValue, {
          ...details,
          [name]: sanitizedValue,
        });
      }
    },
    [touched, validateField, details]
  );

  // El manejo de archivos ahora se hace con el hook useFileUpload
  // handleFileSelect está disponible desde el hook

  const resetDetails = useCallback(() => {
    setDetails({
      productType: "",
      product: "",
      material: "",
      width: "",
      height: "",
      quantity: 1,
      fileName: "",
      fileData: null,
      fileSize: null,
      fileType: null,
      deliveryDate: "",
      comments: "",
    });

    clearFile(); // Usar la función del hook
    clearAllErrors();
  }, [clearFile, clearAllErrors]);

  // Función separada para enviar email de respaldo
  const sendBackupEmail = async (formData, detailsData) => {
    try {
      console.log("📧 Iniciando envío de email de respaldo...");
      console.log("📝 Datos a enviar:", {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        hasFile: !!detailsData.fileName,
        fileName: detailsData.fileName,
        productType: detailsData.productType,
      });

      const payload = { ...formData, details: detailsData };

      // Calcular tamaño aproximado del payload
      const payloadSize = JSON.stringify(payload).length;
      const payloadSizeMB = (payloadSize / 1024 / 1024).toFixed(2);
      console.log(
        `📏 Tamaño del payload: ${payloadSizeMB}MB (${payloadSize} bytes)`
      );

      // Manejar archivos grandes
      let fileRemoved = false;
      if (detailsData.fileData && payloadSize > 8000000) {
        // ~8MB
        console.warn(
          `⚠️ Payload muy grande (${payloadSizeMB}MB), removiendo archivo adjunto para email de respaldo`
        );
        console.log(
          `📁 Archivo original: ${detailsData.fileName} (${
            detailsData.fileSize
              ? (detailsData.fileSize / 1024 / 1024).toFixed(2) + "MB"
              : "tamaño desconocido"
          })`
        );
        payload.details = {
          ...payload.details,
          fileData: null,
          fileNote: `Archivo adjunto demasiado grande para email: ${
            detailsData.fileName
          }${
            detailsData.fileSize
              ? ` (${(detailsData.fileSize / 1024 / 1024).toFixed(2)}MB)`
              : ""
          }`,
        };
        fileRemoved = true;
      } else if (detailsData.fileData) {
        const fileSizeMB = detailsData.fileSize
          ? (detailsData.fileSize / 1024 / 1024).toFixed(2)
          : "N/A";
        console.log(
          `📎 Incluyendo archivo en email: ${detailsData.fileName} (${fileSizeMB}MB)`
        );
      }

      // Crear un AbortController para timeout (aumentamos a 30 segundos)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos timeout

      const startTime = Date.now();
      const emailResponse = await fetch(EMAIL_API.sendContact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      console.log(`⏱️ Tiempo de respuesta: ${duration}ms`);

      if (emailResponse.ok) {
        const emailResult = await emailResponse.json();
        console.log(
          "✅ Email de respaldo enviado correctamente:",
          emailResult.message
        );
        if (emailResult.messageId) {
          console.log("🆔 Message ID:", emailResult.messageId);
        }
      } else {
        const errorText = await emailResponse.text();
        console.error(
          "⚠️ Error al enviar email de respaldo (",
          emailResponse.status,
          "):",
          errorText
        );
      }
    } catch (emailErr) {
      if (emailErr.name === "AbortError") {
        console.log("⏱️ Timeout del email de respaldo (30 segundos)");
      } else {
        console.error(
          "❌ Error inesperado en email de respaldo:",
          emailErr.message
        );
      }
      // No mostramos error al usuario ya que WhatsApp es el canal principal
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus({ type: "", message: "" });

      // Rate limiting - evitar spam de envíos
      const now = Date.now();
      if (now - lastSubmit < 5000) {
        setStatus({
          type: "error",
          message: "Por favor espera 5 segundos entre envíos",
        });
        return;
      }

      // Validar todos los campos
      if (!validateAll(form, details)) {
        setStatus({
          type: "error",
          message:
            "Por favor, completa todos los campos requeridos correctamente.",
        });
        focusFirstError();
        return;
      }

      setLoading(true);
      setLastSubmit(now);

      try {
        // Procesar archivo si existe (lazy loading)
        let processedFileDetails = { ...fileDetails };
        if (fileDetails.fileName && !fileDetails.fileData) {
          console.log("🔄 Procesando archivo antes de enviar...");
          const processed = await processFile();
          if (processed) {
            processedFileDetails = processed;
          }
        }

        // Combinar detalles con archivo procesado
        const finalDetails = {
          ...details,
          fileName: processedFileDetails.fileName,
          fileData: processedFileDetails.fileData,
          fileSize: processedFileDetails.fileSize,
          fileType: processedFileDetails.fileType,
        };

        // Generar mensaje de WhatsApp
        const message = generateWhatsAppMessage(form, finalDetails);

        // Número de WhatsApp
        const whatsappNumber =
          process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56920390272";

        // Crear URL de WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`;

        console.log("✅ WhatsApp URL generada");

        // Mostrar mensaje de éxito
        const successMessage = finalDetails.fileName
          ? `¡Gracias por contactarnos! Te responderemos pronto. Serás redirigido a WhatsApp en breve.`
          : "¡Gracias por contactarnos! Serás redirigido a WhatsApp. Te responderemos pronto.";

        setStatus({
          type: "success",
          message: successMessage,
        });

        // Abrir WhatsApp después de 1 segundo
        setTimeout(() => {
          window.open(whatsappURL, "_blank");
        }, 1000);

        // Backup de datos antes de limpiar
        const formBackup = { ...form };
        const detailsBackup = { ...finalDetails };

        // Limpiar formulario
        setForm({ name: "", company: "", email: "", phone: "" });
        resetDetails();
        clearAllErrors();
        clearSaved(); // Limpiar localStorage después de envío exitoso

        // Enviar email de respaldo de forma asíncrona
        sendBackupEmail(formBackup, detailsBackup);
      } catch (err) {
        console.error("❌ Error en envío:", err);
        setStatus({
          type: "error",
          message:
            err.message || "Error al enviar. Por favor intenta nuevamente.",
        });
      } finally {
        setLoading(false);
      }
    },
    [
      form,
      details,
      fileDetails,
      lastSubmit,
      validateAll,
      focusFirstError,
      processFile,
      resetDetails,
      clearAllErrors,
      clearSaved,
    ]
  );

  // Memoizar productos disponibles
  const currentProducts = useMemo(
    () => PRODUCTS_BY_TYPE[details.productType] || [],
    [details.productType]
  );

  // Manejar vista previa del mensaje
  const handlePreview = useCallback(() => {
    setShowPreview(true);
  }, []);

  const handleClosePreview = useCallback(() => {
    setShowPreview(false);
  }, []);

  return (
    <section
      id="cotizacion-form"
      className="contact-crev section-padding"
      role="region"
      aria-labelledby="form-title"
    >
      <div className="container">
        <h2 id="form-title" className="fz-40 text-center mb-70">
          COTIZACIÓN EXPRESS
        </h2>

        {/* Indicador de progreso */}
        {progress > 0 && progress < 100 && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                Progreso del formulario
              </span>
              <span className="fw-bold" style={{ color: "#eab308" }}>
                {progress}%
              </span>
            </div>
            <ProgressBar
              now={progress}
              variant={progress < 50 ? "warning" : "success"}
              style={{ height: "8px" }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}

        {/* Mensajes de estado con anuncios ARIA */}
        <div role="status" aria-live="polite" aria-atomic="true">
          {status.type === "success" && (
            <Alert
              variant="success"
              className="d-flex align-items-center gap-2"
            >
              <FaCheckCircle />
              {status.message}
            </Alert>
          )}
          {status.type === "error" && (
            <Alert variant="danger">{status.message}</Alert>
          )}
        </div>

        <RBForm onSubmit={handleSubmit} noValidate role="form">
          <div className="row d-flex flex-row">
            <article className="col-lg-5">
              <div className="sec-lg-head mb-60">
                <h2 className="fz-20">
                  Obtén tu Cotización <b className="fst-italic">EXPRESS</b>
                </h2>
                <p className="fz-15 mt-10">
                  Cuéntanos tu visión y recibe una propuesta personalizada al
                  instante. Nuestro equipo de asesores especializados está listo
                  para transformar tu marca con soluciones gráficas innovadoras,
                  presupuestos competitivos y entrega garantizada. ¡Lleva tu
                  identidad visual al siguiente nivel!
                </p>
              </div>
              <div className="full-width">
                {/* Usar componente modular para campos de contacto */}
                <ContactInfoFields
                  form={form}
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </article>

            <article className="col-lg-6 offset-lg-1 valign">
              {/* Usar componentes modulares para detalles del producto */}
              <ProductDetailsFields
                details={details}
                errors={errors}
                touched={touched}
                onChange={handleDetailChange}
                onBlur={handleBlur}
                productTypes={PRODUCT_TYPES}
                currentProducts={currentProducts}
                materials={MATERIALS}
                sizes={SIZES}
                quantities={QUANTITIES}
                fileDetails={fileDetails}
                fileError={fileError}
                onFileChange={handleFileSelect}
              />
            </article>
          </div>

          {/* Botones de acción - fuera de las columnas para mejor diseño */}
          <div className="row">
            <div className="col-12">
              <div
                className="d-flex justify-content-end align-items-center mt-5"
                style={{ gap: "1rem" }}
              >
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={handlePreview}
                  disabled={loading || progress < 50}
                  className="d-flex align-items-center"
                  style={{ gap: "0.5rem" }}
                >
                  <FaEye />
                  Vista Previa
                </Button>
                <Button
                  variant="secondary"
                  onClick={resetDetails}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="text-light d-flex align-items-center"
                  variant="success"
                  disabled={loading || isProcessing}
                  style={{ backgroundColor: "#25D366", gap: "0.5rem" }}
                >
                  {loading || isProcessing ? (
                    "Procesando..."
                  ) : (
                    <>
                      <FaWhatsapp size={20} />
                      Enviar por WhatsApp
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </RBForm>

        {/* Modal de Vista Previa */}
        <Modal show={showPreview} onHide={handleClosePreview} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Vista Previa del Mensaje</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              {generateWhatsAppMessage(form, {
                ...details,
                fileName: fileDetails.fileName,
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePreview}>
              Cerrar
            </Button>
            <Button
              variant="success"
              onClick={() => {
                handleClosePreview();
                // El formulario se enviará con el submit normal
              }}
              style={{ backgroundColor: "#25D366" }}
            >
              <FaWhatsapp className="me-2" />
              Confirmar y Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
}

export default Form;
