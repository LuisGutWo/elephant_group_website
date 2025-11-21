const https = require("http");

const testData = {
  name: "Test User",
  company: "Test Company",
  email: "test@example.com",
  phone: "123456789",
  details: {
    productType: "impreso",
    product: "Volantes",
    material: "Papel couchê",
    width: "25",
    height: "20",
    quantity: 10,
    deliveryDate: "2025-11-25",
    comments: "Test comment",
  },
};

const postData = JSON.stringify(testData);

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/send-contact",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
};

console.log("🧪 Probando API de envío de correos...");
console.log("📡 Enviando datos a: http://localhost:3000/api/send-contact");

const req = https.request(options, (res) => {
  console.log(`📊 Status Code: ${res.statusCode}`);
  console.log(`📋 Headers: ${JSON.stringify(res.headers, null, 2)}`);

  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("📧 Respuesta del servidor:");
    try {
      const jsonResponse = JSON.parse(data);
      console.log(JSON.stringify(jsonResponse, null, 2));
    } catch (e) {
      console.log("📝 Respuesta (texto):", data);
    }
  });
});

req.on("error", (error) => {
  console.error("❌ Error:", error.message);
});

req.setTimeout(30000, () => {
  console.log("⏱️ Timeout - La API tardó más de 30 segundos en responder");
  req.destroy();
});

req.write(postData);
req.end();
