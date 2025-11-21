import React, { useState } from "react";
import { Button, Alert, Card } from "react-bootstrap";

function EmailTestComponent() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const testEmailConnection = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/email-status");
      const result = await response.json();

      setStatus({
        type: result.connected ? "success" : "warning",
        message: result.message,
        details: result,
      });
    } catch (error) {
      setStatus({
        type: "danger",
        message: "Error verificando conexión de email",
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async () => {
    setLoading(true);

    try {
      const testData = {
        name: "Prueba Sistema",
        company: "Elephant Group Test",
        email: "test@example.com",
        phone: "123456789",
        details: {
          productType: "impreso",
          product: "Volantes",
          material: "Papel couchê",
          width: "20",
          height: "30",
          quantity: 100,
          deliveryDate: new Date().toISOString().split("T")[0],
          comments: "Email de prueba del sistema",
        },
      };

      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      setStatus({
        type: response.ok ? "success" : "danger",
        message: result.message,
        details: result,
      });
    } catch (error) {
      setStatus({
        type: "danger",
        message: "Error enviando email de prueba",
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header>
        <h5>🔧 Pruebas del Sistema de Email</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex gap-2 mb-3">
          <Button
            variant="outline-primary"
            onClick={testEmailConnection}
            disabled={loading}
          >
            {loading ? "⏳ Verificando..." : "🔍 Verificar Conexión"}
          </Button>
          <Button
            variant="outline-success"
            onClick={sendTestEmail}
            disabled={loading}
          >
            {loading ? "⏳ Enviando..." : "📧 Enviar Email de Prueba"}
          </Button>
        </div>

        {status && (
          <Alert variant={status.type}>
            <strong>{status.message}</strong>
            {status.details && (
              <div className="mt-2">
                <details>
                  <summary style={{ cursor: "pointer" }}>
                    Ver detalles técnicos
                  </summary>
                  <pre
                    className="mt-2"
                    style={{ fontSize: "0.8em", whiteSpace: "pre-wrap" }}
                  >
                    {JSON.stringify(status.details, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default EmailTestComponent;
