import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("📊 API /email-status llamado");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Verificar configuración de variables de entorno
    const envStatus = {
      smtp_host: !!process.env.SMTP_HOST,
      smtp_user: !!process.env.SMTP_USER,
      smtp_pass: !!process.env.SMTP_PASS,
      smtp_port: process.env.SMTP_PORT || "587",
      contact_recipient: !!process.env.CONTACT_RECIPIENT,
    };

    console.log("🔧 Estado de variables de entorno:", envStatus);

    // Si no hay configuración SMTP, retornar estado
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      return res.status(200).json({
        configured: false,
        message: "SMTP no configurado",
        envStatus,
      });
    }

    // Probar conexión SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000, // 10 segundos
      socketTimeout: 10000,
    });

    try {
      await transporter.verify();
      console.log("✅ Conexión SMTP exitosa");

      return res.status(200).json({
        configured: true,
        connected: true,
        message: "SMTP configurado y funcionando correctamente",
        envStatus,
        recipient: process.env.CONTACT_RECIPIENT,
      });
    } catch (connectionError) {
      console.error("❌ Error de conexión SMTP:", connectionError.message);

      return res.status(200).json({
        configured: true,
        connected: false,
        message: "SMTP configurado pero no se puede conectar",
        error: connectionError.message,
        envStatus,
      });
    }
  } catch (err) {
    console.error("❌ Error verificando estado SMTP:", err);
    return res.status(500).json({
      configured: false,
      connected: false,
      message: "Error verificando configuración SMTP",
      error: err.message,
    });
  }
}
