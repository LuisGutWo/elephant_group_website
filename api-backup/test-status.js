// API de prueba para verificar que el servidor funciona
export default function handler(req, res) {
  console.log("🔍 API test-status llamada");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return res.status(200).json({
    status: "ok",
    message: "API is working",
    timestamp: new Date().toISOString(),
    env: {
      smtp_host: process.env.SMTP_HOST ? "configured" : "missing",
      smtp_user: process.env.SMTP_USER ? "configured" : "missing",
      smtp_pass: process.env.SMTP_PASS ? "configured" : "missing",
      contact_recipient: process.env.CONTACT_RECIPIENT
        ? "configured"
        : "missing",
    },
  });
}
