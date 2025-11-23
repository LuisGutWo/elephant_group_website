import React from "react";
import { Form as RBForm, Row, Col } from "react-bootstrap";
import FileUploadField from "./FileUploadField";

const ProductDetailsFields = ({
  details,
  errors,
  touched,
  onChange,
  onBlur,
  productTypes,
  currentProducts,
  materials,
  sizes,
  quantities,
  fileDetails,
  fileError,
  onFileChange,
}) => {
  return (
    <Row className="g-3">
      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row justify-content-between align-items-center"
          controlId="productType"
          role="group"
        >
          <RBForm.Label>Tipo de producto</RBForm.Label>
          <RBForm.Select
            name="productType"
            value={details.productType}
            onChange={onChange}
            onBlur={() => onBlur("productType")}
            isInvalid={touched.productType && !!errors.productType}
            aria-label="Tipo de producto"
            aria-required="true"
            style={{
              width: "70%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              color: "#9191919",
              backgroundColor: "#9191912a",
            }}
          >
            <option value="">- Seleccionar -</option>
            {productTypes.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </RBForm.Select>
          <RBForm.Control.Feedback type="invalid">
            {errors.productType}
          </RBForm.Control.Feedback>
        </RBForm.Group>
      </Col>

      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row justify-content-between align-items-center"
          controlId="product"
          role="group"
        >
          <RBForm.Label>Producto específico</RBForm.Label>
          <RBForm.Select
            name="product"
            value={details.product}
            onChange={onChange}
            onBlur={() => onBlur("product")}
            isInvalid={touched.product && !!errors.product}
            disabled={!details.productType}
            aria-label="Producto específico"
            aria-required="true"
            style={{
              width: "70%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              color: "#9191919",
              backgroundColor: "#9191912a",
            }}
          >
            <option value="">- Seleccionar producto -</option>
            {currentProducts.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </RBForm.Select>
          <RBForm.Control.Feedback type="invalid">
            {errors.product}
          </RBForm.Control.Feedback>
        </RBForm.Group>
      </Col>

      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row justify-content-between align-items-center"
          controlId="material"
          role="group"
        >
          <RBForm.Label>Material deseado</RBForm.Label>
          <RBForm.Select
            name="material"
            value={details.material}
            onChange={onChange}
            onBlur={() => onBlur("material")}
            isInvalid={touched.material && !!errors.material}
            aria-label="Material deseado"
            aria-required="true"
            style={{
              width: "70%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              color: "#9191919",
              backgroundColor: "#9191912a",
            }}
          >
            <option value="">- Seleccionar -</option>
            {materials.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </RBForm.Select>
          <RBForm.Control.Feedback type="invalid">
            {errors.material}
          </RBForm.Control.Feedback>
        </RBForm.Group>
      </Col>

      <section className="mb-2 d-flex flex-row justify-content-start align-items-center">
        <RBForm.Label className="me-3 mr-80" htmlFor="width">
          Medidas (cm.)
        </RBForm.Label>
        <Col md={2}>
          <RBForm.Group controlId="width" role="group">
            <RBForm.Select
              name="width"
              value={details.width}
              onChange={onChange}
              onBlur={() => onBlur("width")}
              isInvalid={touched.width && !!errors.width}
              aria-label="Ancho en centímetros"
              aria-required="true"
              style={{
                width: "100%",
                maxWidth: "100px",
                height: "30px",
                margin: "0",
                border: "none",
                fontWeight: "500",
                fontSize: "0.7rem",
                backgroundColor: "#9191912a",
              }}
            >
              <option value="">- Ancho -</option>
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </RBForm.Select>
            <RBForm.Control.Feedback type="invalid">
              {errors.width}
            </RBForm.Control.Feedback>
          </RBForm.Group>
        </Col>
        <Col md={2}>
          <RBForm.Group controlId="height" role="group">
            <RBForm.Select
              name="height"
              value={details.height}
              onChange={onChange}
              onBlur={() => onBlur("height")}
              isInvalid={touched.height && !!errors.height}
              aria-label="Alto en centímetros"
              aria-required="true"
              style={{
                width: "90%",
                border: "none",
                fontWeight: "500",
                fontSize: "0.7rem",
                backgroundColor: "#9191912a",
                marginRight: "1rem",
              }}
            >
              <option value="">- Alto -</option>
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </RBForm.Select>
            <RBForm.Control.Feedback type="invalid">
              {errors.height}
            </RBForm.Control.Feedback>
          </RBForm.Group>
        </Col>
        <Col md={3}>
          <RBForm.Group
            className="d-flex flex-row ms-2 align-items-center justify-content-start"
            controlId="quantity"
            role="group"
          >
            <RBForm.Label
              className="me-2"
              style={{
                fontSize: "0.85rem",
                fontWeight: "500",
                minWidth: "60px",
                marginBottom: "0",
              }}
            >
              Cantidad:
            </RBForm.Label>
            <RBForm.Select
              name="quantity"
              value={details.quantity}
              onChange={onChange}
              onBlur={() => onBlur("quantity")}
              isInvalid={touched.quantity && !!errors.quantity}
              aria-label="Cantidad de unidades"
              aria-required="true"
              style={{
                width: "80px",
                height: "30px",
                margin: "0",
                border: "none",
                fontWeight: "500",
                fontSize: "0.7rem",
                color: "#9191919",
                backgroundColor: "#9191912a",
              }}
              required
            >
              {quantities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </RBForm.Select>
            <RBForm.Control.Feedback type="invalid">
              {errors.quantity}
            </RBForm.Control.Feedback>
          </RBForm.Group>
        </Col>
      </section>

      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row justify-content-evenly align-items-center"
          controlId="deliveryDate"
          role="group"
        >
          <RBForm.Label className="me-3">
            Fecha de entrega estimada
          </RBForm.Label>
          <RBForm.Control
            type="date"
            name="deliveryDate"
            value={details.deliveryDate}
            onChange={onChange}
            onBlur={() => onBlur("deliveryDate")}
            isInvalid={touched.deliveryDate && !!errors.deliveryDate}
            aria-label="Fecha de entrega estimada"
            aria-required="true"
            style={{
              width: "70%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              backgroundColor: "#9191912a",
            }}
          />
          <RBForm.Control.Feedback type="invalid">
            {errors.deliveryDate}
          </RBForm.Control.Feedback>
        </RBForm.Group>
      </Col>

      <Col md={12}>
        <FileUploadField
          details={fileDetails}
          error={fileError}
          onChange={onFileChange}
        />
      </Col>

      <Col md={12}>
        <RBForm.Group
          className="mb-3 d-flex flex-row justify-content-between align-items-between"
          controlId="comments"
          role="group"
        >
          <RBForm.Label className="me-4">Comentario adicional</RBForm.Label>
          <RBForm.Control
            as="textarea"
            rows={4}
            name="comments"
            value={details.comments}
            onChange={onChange}
            placeholder="Describe aquí información adicional..."
            maxLength={1000}
            aria-label="Comentarios adicionales"
            style={{
              width: "60%",
              border: "none",
              fontWeight: "500",
              fontSize: "0.7rem",
              backgroundColor: "#9191912a",
            }}
          />
        </RBForm.Group>
      </Col>
    </Row>
  );
};

export default ProductDetailsFields;
