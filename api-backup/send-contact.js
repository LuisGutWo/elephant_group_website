import nodemailer from "nodemailer";

// Configurar el límite de tamaño del cuerpo a 10MB
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  console.log("📨 API /send-contact llamado");
  console.log("📊 Content-Length:", req.headers["content-length"]);
  console.log("🔍 Request method:", req.method);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, company, email, phone, details } = req.body || {};
  console.log("📝 Datos recibidos:", {
    name,
    company,
    email,
    phone,
    message: req.body.message,
    productType: details?.productType,
    product: details?.product,
    hasFile: !!details?.fileName,
    fileName: details?.fileName,
  });

  if (!name || !company || !email || !phone) {
    return res.status(400).json({ message: "Faltan campos requeridos." });
  }

  // Valida email simple
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }

  try {
    // Validar variables de entorno
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.error("❌ Variables de entorno SMTP no configuradas");
      console.log(
        "⚠️ Para activar el envío de emails, configura las variables de entorno SMTP en .env.local"
      );
      // En lugar de devolver error, devolver éxito pero indicar que el email no se envió
      return res.status(200).json({
        message: "Mensaje recibido correctamente. (Email no configurado)",
        warning: "SMTP not configured",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465, // true para 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Agregar configuración adicional para mejor manejo de errores
      pool: true,
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5,
    });

    const recipient = process.env.CONTACT_RECIPIENT;
    if (!recipient) {
      return res.status(500).json({ message: "Destinatario no configurado." });
    }

    const subject = `Nueva cotización de ${name}`;
    const text = `
NUEVA COTIZACIÓN EXPRESS

DATOS DEL CLIENTE:
Nombre: ${name}
Empresa: ${company}
Email: ${email}
Teléfono: ${phone}

DETALLES DEL PRODUCTO:
Tipo de producto: ${details?.productType || "No especificado"}
Producto: ${details?.product || "No especificado"}
Material: ${details?.material || "No especificado"}
Medidas: ${details?.width || ""}cm x ${details?.height || ""}cm
Cantidad: ${details?.quantity || 1}
${details?.fileName ? `Archivo adjunto: ${details.fileName}` : ""}
${details?.fileNote ? `NOTA: ${details.fileNote}` : ""}
Fecha de entrega: ${details?.deliveryDate || "No especificada"}


Mensaje: ${req.body.message || ""}
${details?.comments ? `Comentarios: ${details.comments}` : ""}

Enviado desde el formulario web
`;

    const html = `
      <h3>${subject}</h3>

      <h4>DATOS DEL CLIENTE:</h4>
      <ul>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>Empresa:</strong> ${company}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${phone}</li>
      </ul>

      <h4>DETALLES DEL PRODUCTO:</h4>
      <ul>
        <li><strong>Tipo de producto:</strong> ${
          details?.productType || "No especificado"
        }</li>
        <li><strong>Producto:</strong> ${
          details?.product || "No especificado"
        }</li>
        <li><strong>Material:</strong> ${
          details?.material || "No especificado"
        }</li>
        <li><strong>Medidas:</strong> ${details?.width || ""}cm x ${
          details?.height || ""
        }cm</li>
        <li><strong>Cantidad:</strong> ${details?.quantity || 1}</li>
        ${
          details?.fileName
            ? `<li><strong>Archivo adjunto:</strong> ${details.fileName}</li>`
            : ""
        }
        ${
          details?.fileNote
            ? `<li><strong>⚠️ Nota sobre archivo:</strong> <em>${details.fileNote}</em></li>`
            : ""
        }
        <li><strong>Fecha de entrega:</strong> ${
          details?.deliveryDate || "No especificada"
        }</li>
        ${
          details?.comments
            ? `<li><strong>Comentarios:</strong> ${details.comments}</li>`
            : ""
        }
            <li><strong>Mensaje:</strong> ${req.body.message || ""}</li>
      </ul>

      <p><em>Enviado desde el formulario web</em></p>
    `;

    console.log("📬 Enviando email a:", recipient);
    if (details?.fileName) {
      console.log("📎 Archivo adjunto detectado:", details.fileName);
    }

    // Verificar conexión antes de enviar
    try {
      await transporter.verify();
      console.log("✅ Conexión SMTP verificada");
    } catch (verifyError) {
      console.error("❌ Error de conexión SMTP:", verifyError.message);
      return res.status(500).json({ message: "Error de conexión SMTP." });
    }

    // Preparar configuración del email
    const emailConfig = {
      from: `${name} <${process.env.SMTP_USER}>`,
      to: recipient,
      subject,
      text,
      html,
    };

    // Agregar archivo adjunto si existe
    if (details?.fileData && details?.fileName) {
      try {
        console.log("📎 Procesando archivo adjunto...");
        // Extraer el contenido base64 (remover el prefijo data:)
        const base64Data = details.fileData.split(",")[1];
        if (base64Data) {
          emailConfig.attachments = [
            {
              filename: details.fileName,
              content: base64Data,
              encoding: "base64",
            },
          ];
          console.log("✅ Archivo adjunto preparado:", details.fileName);
        }
      } catch (attachError) {
        console.error(
          "❌ Error procesando archivo adjunto:",
          attachError.message
        );
        // Continuar sin el adjunto en lugar de fallar completamente
      }
    }

    const result = await transporter.sendMail(emailConfig);

    console.log("✅ Email enviado exitosamente. Message ID:", result.messageId);
    return res.status(200).json({
      message: "Correo enviado correctamente.",
      messageId: result.messageId,
    });
  } catch (err) {
    console.error("send-contact error:", err);
    return res.status(500).json({ message: "Error enviando correo." });
  }
}

// si prefieres usar 'service: "gmail"' en lugar de host/port
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
