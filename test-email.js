// Script de prueba para verificar el sistema de emails
// Ejecutar con: node test-email.js

const testEmailStatus = async () => {
  try {
    console.log("🔍 Verificando estado del sistema de email...");

    const response = await fetch("http://localhost:3001/api/email-status");
    const result = await response.json();

    console.log("📊 Estado del sistema:", result);

    if (result.configured && result.connected) {
      console.log("✅ Sistema de email funcionando correctamente");
      return true;
    } else {
      console.log("⚠️ Problema con el sistema de email:", result.message);
      return false;
    }
  } catch (error) {
    console.error("❌ Error verificando sistema:", error.message);
    return false;
  }
};

const testSendEmail = async () => {
  try {
    console.log("📧 Enviando email de prueba...");

    const testData = {
      name: "Prueba Automatizada",
      company: "Elephant Group Test",
      email: "test@elephantgroup.cl",
      phone: "+56993239203",
      details: {
        productType: "impreso",
        product: "Volantes",
        material: "Papel couchê",
        width: "20",
        height: "30",
        quantity: 100,
        deliveryDate: new Date().toISOString().split("T")[0],
        comments: "Este es un email de prueba automática del sistema",
        fileName: "test.pdf",
        fileData:
          "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVGl0bGUgKFRlc3QpCi9Qcm9kdWNlciAoVGVzdCkKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovQ291bnQgMQovS2lkcyBbNCAwIFJdCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMyAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMDMgMDAwMDAgbiAKMDAwMDAwMDE1OCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDUKL1Jvb3QgMiAwIFIKPj4Kc3RhcnR4cmVmCjIzOAolJUVPRgo=", // PDF base64 de prueba
      },
    };

    const response = await fetch("http://localhost:3001/api/send-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log("📧 Resultado del envío:", result);

    if (response.ok) {
      console.log("✅ Email enviado correctamente");
      if (result.messageId) {
        console.log("🆔 Message ID:", result.messageId);
      }
      return true;
    } else {
      console.log("❌ Error enviando email:", result.message);
      return false;
    }
  } catch (error) {
    console.error("❌ Error en la prueba de envío:", error.message);
    return false;
  }
};

const runTests = async () => {
  console.log("🚀 Iniciando pruebas del sistema de email...\n");

  const statusOk = await testEmailStatus();
  console.log("");

  if (statusOk) {
    const sendOk = await testSendEmail();
    console.log("");

    if (sendOk) {
      console.log(
        "🎉 Todas las pruebas exitosas! El sistema está funcionando correctamente."
      );
    } else {
      console.log(
        "⚠️ El sistema está configurado pero hay problemas con el envío."
      );
    }
  } else {
    console.log("❌ El sistema no está configurado correctamente.");
  }
};

// Solo ejecutar si es llamado directamente
if (require.main === module) {
  runTests();
}

module.exports = { testEmailStatus, testSendEmail };
