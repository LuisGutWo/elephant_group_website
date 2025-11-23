import React from "react";
import { Form as RBForm, Row, Col } from "react-bootstrap";

const ContactInfoFields = ({ form, errors, touched, onChange, onBlur }) => {
  return (
    <Row className="g-3 d-flex flex-column">
      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row align-items-center justify-content-between"
          controlId="name"
          role="group"
        >
          <RBForm.Label className="me-2 text-center d-flex flex-row align-items-center">
            Nombre completo
          </RBForm.Label>
          <RBForm.Control
            name="name"
            value={form.name}
            onChange={onChange}
            onBlur={() => onBlur("name")}
            isInvalid={touched.name && !!errors.name}
            placeholder="ESCRIBE TU NOMBRE"
            autoComplete="name"
            aria-label="Nombre completo"
            aria-required="true"
            style={{
              width: "70%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              color: "#9191919",
              backgroundColor: "#9191912a",
            }}
          />
          <RBForm.Control.Feedback type="invalid">
            {errors.name}
          </RBForm.Control.Feedback>
        </RBForm.Group>
      </Col>

      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row justify-content-between align-items-center"
          controlId="company"
          role="group"
        >
          <RBForm.Label>Empresa</RBForm.Label>
          <RBForm.Control
            name="company"
            value={form.company}
            onChange={onChange}
            onBlur={() => onBlur("company")}
            isInvalid={touched.company && !!errors.company}
            placeholder="ESCRIBE EL NOMBRE DE TU EMPRESA"
            autoComplete="organization"
            aria-label="Nombre de la empresa"
            aria-required="true"
            style={{
              width: "80%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              color: "#9191919",
              backgroundColor: "#9191912a",
            }}
          />
          <RBForm.Control.Feedback type="invalid">
            {errors.company}
          </RBForm.Control.Feedback>
        </RBForm.Group>
      </Col>

      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row justify-content-between align-items-center"
          controlId="email"
          role="group"
        >
          <RBForm.Label>Correo electrónico</RBForm.Label>
          <RBForm.Control
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            onBlur={() => onBlur("email")}
            isInvalid={touched.email && !!errors.email}
            placeholder="ESCRIBE TU CORREO CORPORATIVO O PERSONAL"
            autoComplete="email"
            inputMode="email"
            aria-label="Correo electrónico"
            aria-required="true"
            style={{
              width: "70%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              color: "#9191919",
              backgroundColor: "#9191912a",
            }}
          />
          <RBForm.Control.Feedback type="invalid">
            {errors.email}
          </RBForm.Control.Feedback>
        </RBForm.Group>
      </Col>

      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row justify-content-between align-items-center"
          controlId="phone"
          role="group"
        >
          <RBForm.Label>Teléfono</RBForm.Label>
          <RBForm.Control
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            onBlur={() => onBlur("phone")}
            isInvalid={touched.phone && !!errors.phone}
            placeholder="ESCRIBE TU WHATSAPP O TELÉFONO"
            autoComplete="tel"
            inputMode="tel"
            aria-label="Número de teléfono"
            aria-required="true"
            style={{
              width: "80%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              color: "#9191919",
              backgroundColor: "#9191912a",
            }}
          />
          <RBForm.Control.Feedback type="invalid">
            {errors.phone}
          </RBForm.Control.Feedback>
        </RBForm.Group>
      </Col>
    </Row>
  );
};

export default ContactInfoFields;
