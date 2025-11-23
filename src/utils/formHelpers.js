// Utility functions for Form component
import imageCompression from "browser-image-compression";
import DOMPurify from "dompurify";

/**
 * Sanitiza un input de texto para prevenir XSS
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Formatea un número de teléfono chileno automáticamente
 */
export const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 0) return "";
  if (digits.length <= 4) return digits;
  if (digits.length <= 8) return `${digits.slice(0, 4)} ${digits.slice(4)}`;

  // Formato: +56 9 1234 5678
  if (digits.startsWith("56")) {
    const number = digits.slice(2);
    if (number.length <= 1) return `+56 ${number}`;
    if (number.length <= 5) return `+56 9 ${number.slice(1)}`;
    return `+56 9 ${number.slice(1, 5)} ${number.slice(5, 9)}`;
  }

  return `+56 9 ${digits.slice(0, 4)} ${digits.slice(4, 8)}`;
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida número de teléfono (mínimo 7 dígitos)
 */
export const isValidPhone = (phone) => {
  const phoneDigits = phone.replace(/\D/g, "");
  return phoneDigits.length >= 7;
};

/**
 * Comprime una imagen antes de subirla
 */
export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: file.type,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(
      `🗜️ Imagen comprimida: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(
        compressedFile.size /
        1024 /
        1024
      ).toFixed(2)}MB`
    );
    return compressedFile;
  } catch (error) {
    console.error("❌ Error comprimiendo imagen:", error);
    return file;
  }
};

/**
 * Convierte un archivo a Base64
 */
export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject("Error leyendo archivo");
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

/**
 * Valida un archivo según formato y tamaño
 */
export const validateFile = (file) => {
  if (!file) return { valid: false, error: "No se seleccionó ningún archivo" };

  const allowedFormats = {
    pdf: { mime: "application/pdf", maxSize: 8 },
    jpg: { mime: "image/jpeg", maxSize: 5 },
    jpeg: { mime: "image/jpeg", maxSize: 5 },
    png: { mime: "image/png", maxSize: 5 },
    ai: { mime: "application/postscript", maxSize: 10 },
    eps: { mime: "application/postscript", maxSize: 10 },
  };

  const ext = file.name.split(".").pop()?.toLowerCase();

  // Validar extensión
  if (!ext || !allowedFormats[ext]) {
    return {
      valid: false,
      error:
        "Formato no permitido. Solo se aceptan: PDF, JPG, JPEG, PNG, AI, EPS",
    };
  }

  const formatConfig = allowedFormats[ext];
  const maxFileSize = 10 * 1024 * 1024; // 10MB límite general
  const formatMaxSize = formatConfig.maxSize * 1024 * 1024;

  // Validar tamaño general
  if (file.size > maxFileSize) {
    return {
      valid: false,
      error: `Archivo demasiado grande. Tamaño máximo: 10MB. Tu archivo: ${(
        file.size /
        1024 /
        1024
      ).toFixed(2)}MB`,
    };
  }

  // Validar tamaño específico del formato
  if (file.size > formatMaxSize) {
    return {
      valid: false,
      error: `Archivo ${ext.toUpperCase()} demasiado grande. Máximo para este formato: ${
        formatConfig.maxSize
      }MB. Tu archivo: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  // Validar tipo MIME si está disponible
  if (file.type && !file.type.includes(formatConfig.mime.split("/")[0])) {
    return {
      valid: false,
      error: `Tipo de archivo no válido. Se esperaba ${ext.toUpperCase()}, pero se detectó otro formato.`,
    };
  }

  return { valid: true, error: null };
};

/**
 * Calcula el progreso del formulario (0-100)
 */
export const calculateProgress = (form, details) => {
  const requiredFields = [
    form.name,
    form.company,
    form.email,
    form.phone,
    details.productType,
    details.product,
    details.material,
    details.width,
    details.height,
    details.quantity,
    details.deliveryDate,
  ];

  const filledFields = requiredFields.filter(
    (field) => field && field !== "" && field !== 0
  ).length;
  return Math.round((filledFields / requiredFields.length) * 100);
};

/**
 * Genera el mensaje de WhatsApp formateado
 */
export const generateWhatsAppMessage = (form, details) => {
  return `
${form.name ? `*NUEVA COTIZACIÓN EXPRESS*\n\n` : ""}

${form.name ? `*DATOS DEL CLIENTE*\n\n` : ""}
• Nombre: ${form.name || ""}
• Empresa: ${form.company || ""}
• Email: ${form.email || ""}
• Teléfono: ${form.phone || ""}

${details.productType ? `\n\n*DETALLES DEL PRODUCTO*\n\n` : ""}
• Tipo: ${details.productType || ""}
• Producto: ${details.product || ""}
• Material: ${details.material || ""}
• Medidas: ${details.width || ""}cm x ${details.height || ""}cm
• Cantidad: ${details.quantity || 1}
${details.fileName ? `\n\n• Archivo adjunto: ${details.fileName}` : ""}
• Fecha de entrega: ${details.deliveryDate || ""}
${details.comments ? `\n\n• Comentarios: ${details.comments}` : ""}

_Enviado desde el formulario web_
  `.trim();
};

/**
 * Guarda datos en localStorage
 */
export const saveToLocalStorage = (key, data) => {
  try {
    const dataToSave = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(dataToSave));
  } catch (error) {
    console.error("Error guardando en localStorage:", error);
  }
};

/**
 * Carga datos de localStorage
 */
export const loadFromLocalStorage = (key, maxAge = 24 * 60 * 60 * 1000) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return null;

    const data = JSON.parse(saved);
    const age = Date.now() - (data.timestamp || 0);

    // Si los datos son muy antiguos (> maxAge), no los cargamos
    if (age > maxAge) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error cargando de localStorage:", error);
    return null;
  }
};

/**
 * Limpia datos de localStorage
 */
export const clearLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error limpiando localStorage:", error);
  }
};

/**
 * Fetch con retry automático
 */
export const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;

      // Si es un error de servidor (5xx), reintentamos
      if (response.status >= 500 && i < retries - 1) {
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
        continue;
      }

      return response;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
};
