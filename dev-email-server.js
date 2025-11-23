/**
 * Servidor Mock para desarrollo local
 * Simula las Netlify Functions sin necesidad de Netlify CLI
 */

const http = require("http");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env.local" });

const PORT = 3001;

// Configurar transporte de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Función para parsear el body de las requests
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Servidor HTTP
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Solo POST
  if (req.method !== "POST") {
    res.writeHead(405);
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  try {
    const body = await parseBody(req);

    // Ruta: /send-simple-contact
    if (req.url === "/send-simple-contact") {
      console.log("📧 [DEV] Enviando email simple:", body);

      const { name, email, message } = body;

      if (!name || !email || !message) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Missing required fields" }));
        return;
      }

      const mailOptions = {
        from: `"Elephant Group Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECIPIENT,
        replyTo: email,
        subject: `Nuevo mensaje de contacto desde el footer - ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4285f4; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
              .info-row { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #4285f4; }
              .label { font-weight: bold; color: #555; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>💬 Nuevo Mensaje de Contacto</h2>
              </div>
              <div class="content">
                <div class="info-row">
                  <span class="label">Nombre:</span> ${name}
                </div>
                <div class="info-row">
                  <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                <div class="info-row">
                  <span class="label">Mensaje:</span><br/>
                  ${message.replace(/\n/g, "<br/>")}
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("✅ [DEV] Email simple enviado correctamente");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          message: "Email sent successfully (DEV)",
        })
      );
    }
    // Ruta: /send-contact
    else if (req.url === "/send-contact") {
      console.log("📧 [DEV] Enviando email de cotización:", body);

      const { name, company, email, phone, details } = body;

      if (!name || !email || !details) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Missing required fields" }));
        return;
      }

      let attachments = [];
      let fileNote = "";

      // Procesar archivo adjunto si existe (los datos del archivo están en details)
      const fileData = details.fileData;
      const fileName = details.fileName;
      const fileType = details.fileType;
      const fileSize = details.fileSize;

      if (fileData && fileName) {
        const fileSizeMB = fileSize / (1024 * 1024);
        console.log(
          `📎 [DEV] Procesando archivo: ${fileName} (${fileSizeMB.toFixed(
            2
          )}MB)`
        );

        if (fileSizeMB > 8) {
          fileNote = `<p style="color: #ff6b6b;"><strong>⚠️ Nota:</strong> El archivo "${fileName}" (${fileSizeMB.toFixed(
            2
          )}MB) era demasiado grande y no se adjuntó. Límite: 8MB</p>`;
        } else {
          const base64Data = fileData.split(",")[1] || fileData;
          attachments.push({
            filename: fileName,
            content: Buffer.from(base64Data, "base64"),
            contentType: fileType || "application/octet-stream",
          });
          console.log(`✅ [DEV] Archivo adjuntado: ${fileName}`);
        }
      }

      const mailOptions = {
        from: `"Elephant Group Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECIPIENT,
        replyTo: email,
        subject: `Nueva Solicitud de Cotización - ${name}`,
        attachments,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #25D366; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
              .section { margin: 20px 0; }
              .section-title { color: #25D366; font-size: 18px; margin-bottom: 10px; border-bottom: 2px solid #25D366; padding-bottom: 5px; }
              .info-row { margin: 8px 0; padding: 8px; background-color: white; }
              .label { font-weight: bold; color: #555; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
              th { background-color: #25D366; color: white; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📋 Nueva Solicitud de Cotización</h2>
              </div>
              <div class="content">
                ${fileNote}
                <div class="section">
                  <div class="section-title">👤 Información del Cliente</div>
                  <div class="info-row"><span class="label">Nombre:</span> ${name}</div>
                  <div class="info-row"><span class="label">Empresa:</span> ${
                    company || "No especificada"
                  }</div>
                  <div class="info-row"><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></div>
                  <div class="info-row"><span class="label">Teléfono:</span> ${
                    phone || "No especificado"
                  }</div>
                </div>

                <div class="section">
                  <div class="section-title">📦 Detalles del Producto</div>
                  <table>
                    <tr><th>Campo</th><th>Valor</th></tr>
                    <tr><td>Tipo de Producto</td><td>${
                      details.productType || "No especificado"
                    }</td></tr>
                    <tr><td>Producto</td><td>${
                      details.product || "No especificado"
                    }</td></tr>
                    <tr><td>Material</td><td>${
                      details.material || "No especificado"
                    }</td></tr>
                    <tr><td>Dimensiones</td><td>${
                      details.dimensions || "No especificado"
                    }</td></tr>
                    <tr><td>Cantidad</td><td>${
                      details.quantity || "No especificada"
                    }</td></tr>
                    <tr><td>Fecha de Entrega</td><td>${
                      details.deliveryDate || "No especificada"
                    }</td></tr>
                  </table>
                </div>

                ${
                  details.comments
                    ? `
                  <div class="section">
                    <div class="section-title">💬 Comentarios Adicionales</div>
                    <div class="info-row">${details.comments.replace(
                      /\n/g,
                      "<br/>"
                    )}</div>
                  </div>
                `
                    : ""
                }

                ${
                  attachments.length > 0
                    ? `
                  <div class="section">
                    <div class="section-title">📎 Archivo Adjunto</div>
                    <div class="info-row">
                      ${fileName} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)
                    </div>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("✅ [DEV] Email de cotización enviado correctamente");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          message: "Quote request sent successfully (DEV)",
        })
      );
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  } catch (error) {
    console.error("❌ [DEV] Error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(
    `\n🚀 Servidor de email de desarrollo corriendo en http://localhost:${PORT}`
  );
  console.log(
    `📧 SMTP configurado: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`
  );
  console.log(`📬 Destinatario: ${process.env.CONTACT_RECIPIENT}\n`);
});
