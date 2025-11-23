import React from "react";
import { Form as RBForm, Col } from "react-bootstrap";

const FileUploadField = ({ details, error, onChange }) => {
  return (
    <Col md={12}>
      <RBForm.Group className="mb-3 mt-2" controlId="file" role="group">
        <div className="d-flex flex-row justify-content-start align-items-start">
          <RBForm.Label className="me-3 d-flex flex-column">
            <span>Adjuntar archivo</span>
            <small className="text-muted" style={{ fontSize: "0.6rem" }}>
              PDF (8MB), JPG/PNG (5MB), AI/EPS (10MB)
            </small>
          </RBForm.Label>
          <div className="d-flex flex-column" style={{ width: "60%" }}>
            <RBForm.Control
              type="file"
              accept=".pdf,.jpg,.jpeg,.ai,.eps,.png"
              onChange={onChange}
              isInvalid={!!error}
              aria-label="Adjuntar archivo de diseño"
              aria-describedby="file-help"
              style={{
                border: "none",
                fontWeight: "500",
                fontSize: "0.7rem",
                backgroundColor: "#9191912a",
              }}
            />
            <small id="file-help" className="visually-hidden">
              Formatos aceptados: PDF hasta 8MB, JPG/PNG hasta 5MB, AI/EPS hasta
              10MB
            </small>
            {details.fileName && !error && (
              <div
                className="mt-1 p-2 rounded"
                role="status"
                aria-live="polite"
                style={{
                  backgroundColor: "#d4edda",
                  border: "1px solid #c3e6cb",
                  fontSize: "0.7rem",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>📎 {details.fileName}</span>
                  <span className="text-success">
                    {details.fileSize
                      ? `${(details.fileSize / 1024 / 1024).toFixed(2)}MB`
                      : ""}
                  </span>
                </div>
                <small className="text-muted">Archivo listo para enviar</small>
              </div>
            )}
            <RBForm.Control.Feedback type="invalid">
              {error}
            </RBForm.Control.Feedback>
          </div>
        </div>
      </RBForm.Group>
    </Col>
  );
};

export default FileUploadField;
