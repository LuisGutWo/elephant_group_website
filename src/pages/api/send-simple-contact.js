import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("📨 API /send-simple-contact llamado");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body || {};
  console.log("📝 Datos recibidos:", { name, email, message });

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
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
      pool: true,
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5,
    });

    const recipient = process.env.CONTACT_RECIPIENT || process.env.SMTP_USER;

    const subject = `Nuevo mensaje de ${name}`;
    const text = `

DATOS DEL CLIENTE:
Nombre: ${name}
Email: ${email}

MENSAJE:
${message}

Enviado desde el formulario de la pagina Web.
Fecha: ${new Date().toLocaleString("es-CL")}
`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">${subject}</h2>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Datos del Cliente:</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>

        <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Mensaje:</h3>
          <p style="white-space: pre-line;">${message}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
        <p style="color: #6c757d; font-size: 14px;">
          <em>Enviado desde el formulario simple de la pagina Web. ${new Date().toLocaleString(
            "es-CL"
          )}</em>
        </p>
      </div>
    `;

    console.log("📬 Enviando email a:", recipient);

    // Verificar conexión antes de enviar
    try {
      await transporter.verify();
      console.log("✅ Conexión SMTP verificada");
    } catch (verifyError) {
      console.error("❌ Error de conexión SMTP:", verifyError.message);
      return res.status(500).json({ message: "Error de conexión SMTP." });
    }

    const result = await transporter.sendMail({
      from: `${name} <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: recipient,
      subject,
      text,
      html,
    });

    console.log("✅ Email enviado exitosamente. Message ID:", result.messageId);
    return res.status(200).json({
      message: "Mensaje enviado correctamente.",
      messageId: result.messageId,
    });
  } catch (err) {
    console.error("send-simple-contact error:", err);
    return res.status(500).json({
      message: "Error enviando el mensaje. Por favor, intente nuevamente.",
    });
  }
}
