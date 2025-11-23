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

  console.log("📨 Netlify Function /send-simple-contact llamado");

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || "{}");

    console.log("📝 Datos recibidos:", {
      name,
      email,
      messageLength: message?.length,
    });

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: "Todos los campos son requeridos.",
        }),
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
    const subject = `Nuevo mensaje de ${name}`;
    const currentDate = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
    });

    const text = `
NUEVO MENSAJE DESDE EL FORMULARIO

DATOS DEL CLIENTE:
Nombre: ${name}
Email: ${email}

MENSAJE:
${message}

──────────────────────────────────────
Enviado desde el formulario simple de la Website
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
    .header { background-color: #007bff; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; }
    .section { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #007bff; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; margin-bottom: 10px; }
    .message-box { background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-line; }
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
        <h3 style="color: #007bff; margin-top: 0;">👤 Datos del Cliente</h3>
        <div class="value"><span class="label">Nombre:</span> ${name}</div>
        <div class="value"><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></div>
      </div>

      <div class="section">
        <h3 style="color: #007bff; margin-top: 0;">💬 Mensaje</h3>
        <div class="message-box">${message}</div>
      </div>

      <div class="footer">
        <p>Enviado desde el formulario simple del sitio web</p>
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

    const result = await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: recipient,
      subject,
      text,
      html,
    });

    console.log("✅ Email enviado exitosamente. Message ID:", result.messageId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Mensaje enviado correctamente.",
        messageId: result.messageId,
      }),
    };
  } catch (err) {
    console.error("❌ Error en send-simple-contact:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Error enviando el mensaje. Por favor, intente nuevamente.",
        error: err.message,
      }),
    };
  }
};
