import nodemailer from "nodemailer";

export const handler = async (event) => {
  // Configurar CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Manejar preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  console.log("📨 Netlify Function /send-contact llamado");

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const { name, company, email, phone, details, message } = JSON.parse(
      event.body || "{}"
    );

    console.log("📝 Datos recibidos:", {
      name,
      company,
      email,
      phone,
      productType: details?.productType,
      product: details?.product,
      hasFile: !!details?.fileName,
      fileName: details?.fileName,
      fileSize: details?.fileSize,
    });

    if (!name || !company || !email || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Faltan campos requeridos." }),
      };
    }

    // Validación de email
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Email inválido." }),
      };
    }

    // Validar variables de entorno
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.error("❌ Variables de entorno SMTP no configuradas");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "Mensaje recibido correctamente. (Email no configurado)",
          warning: "SMTP not configured",
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipient = process.env.CONTACT_RECIPIENT || process.env.SMTP_USER;

    const subject = `Nueva cotización de ${name} - ${company}`;
    const currentDate = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
    });

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
${
  details?.fileName
    ? `📎 Archivo adjunto: ${details.fileName}`
    : "Sin archivo adjunto"
}
${details?.fileNote ? `⚠️ NOTA: ${details.fileNote}` : ""}
Fecha de entrega: ${details?.deliveryDate || "No especificada"}

${message ? `Mensaje:\n${message}\n` : ""}
${details?.comments ? `Comentarios adicionales:\n${details.comments}\n` : ""}

──────────────────────────────────────
Enviado desde el formulario web
Fecha: ${currentDate}
`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #25D366; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; }
    .section { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #25D366; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; margin-bottom: 10px; }
    .file-warning { background-color: #fff3cd; border: 1px solid #ffc107; padding: 10px; border-radius: 5px; margin: 10px 0; }
    .footer { text-align: center; color: #777; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">✉️ ${subject}</h2>
    </div>

    <div class="content">
      <div class="section">
        <h3 style="color: #25D366; margin-top: 0;">👤 Datos del Cliente</h3>
        <div class="value"><span class="label">Nombre:</span> ${name}</div>
        <div class="value"><span class="label">Empresa:</span> ${company}</div>
        <div class="value"><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></div>
        <div class="value"><span class="label">Teléfono:</span> <a href="tel:${phone}">${phone}</a></div>
      </div>

      <div class="section">
        <h3 style="color: #25D366; margin-top: 0;">📦 Detalles del Producto</h3>
        <div class="value"><span class="label">Tipo de producto:</span> ${
          details?.productType || "No especificado"
        }</div>
        <div class="value"><span class="label">Producto:</span> ${
          details?.product || "No especificado"
        }</div>
        <div class="value"><span class="label">Material:</span> ${
          details?.material || "No especificado"
        }</div>
        <div class="value"><span class="label">Medidas:</span> ${
          details?.width || ""
        }cm x ${details?.height || ""}cm</div>
        <div class="value"><span class="label">Cantidad:</span> ${
          details?.quantity || 1
        } unidades</div>
        <div class="value"><span class="label">Fecha de entrega:</span> ${
          details?.deliveryDate || "No especificada"
        }</div>

        ${
          details?.fileName
            ? `<div class="value" style="background-color: #e8f5e9; padding: 10px; border-radius: 5px;">
                <span class="label">📎 Archivo adjunto:</span> ${
                  details.fileName
                }
                ${
                  details?.fileSize
                    ? ` (${(details.fileSize / 1024 / 1024).toFixed(2)}MB)`
                    : ""
                }
              </div>`
            : '<div class="value" style="color: #999;">Sin archivo adjunto</div>'
        }

        ${
          details?.fileNote
            ? `<div class="file-warning">
                <strong>⚠️ Nota sobre el archivo:</strong><br>
                ${details.fileNote}
              </div>`
            : ""
        }
      </div>

      ${
        message || details?.comments
          ? `<div class="section">
              <h3 style="color: #25D366; margin-top: 0;">💬 Mensajes</h3>
              ${
                message
                  ? `<div class="value"><span class="label">Mensaje principal:</span><br><div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; white-space: pre-line;">${message}</div></div>`
                  : ""
              }
              ${
                details?.comments
                  ? `<div class="value"><span class="label">Comentarios adicionales:</span><br><div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; white-space: pre-line;">${details.comments}</div></div>`
                  : ""
              }
            </div>`
          : ""
      }

      <div class="footer">
        <p>Enviado desde el formulario web de cotización EXPRESS</p>
        <p>${currentDate}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    console.log("📬 Enviando email a:", recipient);

    // Verificar conexión SMTP
    await transporter.verify();
    console.log("✅ Conexión SMTP verificada");

    // Preparar configuración del email
    const emailConfig = {
      from: `"${name} - ${company}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: recipient,
      subject,
      text,
      html,
    };

    // Agregar archivo adjunto si existe y es válido
    if (details?.fileData && details?.fileName) {
      try {
        console.log("📎 Procesando archivo adjunto...");
        const base64Match = details.fileData.match(
          /^data:([^;]+);base64,(.+)$/
        );

        if (base64Match) {
          const mimeType = base64Match[1];
          const base64Data = base64Match[2];

          emailConfig.attachments = [
            {
              filename: details.fileName,
              content: base64Data,
              encoding: "base64",
              contentType: mimeType,
            },
          ];

          const fileSizeMB = details.fileSize
            ? (details.fileSize / 1024 / 1024).toFixed(2)
            : "N/A";
          console.log(
            `✅ Archivo adjunto preparado: ${details.fileName} (${fileSizeMB}MB, ${mimeType})`
          );
        }
      } catch (attachError) {
        console.error(
          "❌ Error procesando archivo adjunto:",
          attachError.message
        );
      }
    }

    const result = await transporter.sendMail(emailConfig);

    console.log("✅ Email enviado exitosamente. Message ID:", result.messageId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Correo enviado correctamente.",
        messageId: result.messageId,
        hasAttachment: !!emailConfig.attachments,
      }),
    };
  } catch (err) {
    console.error("❌ Error en send-contact:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Error enviando correo.",
        error: err.message,
      }),
    };
  }
};
