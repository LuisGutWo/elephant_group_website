import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { isValidEmail, isValidPhone } from "../formHelpers";

/**
 * Hook personalizado para manejar la validación del formulario
 */
export const useFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validar un campo específico
  const validateField = useCallback((field, value, allValues = {}) => {
    let error = "";

    switch (field) {
      case "name":
        if (!value || !value.trim()) {
          error = "Nombre requerido";
        }
        break;

      case "company":
        if (!value || !value.trim()) {
          error = "Empresa requerida";
        }
        break;

      case "email":
        if (!value || !isValidEmail(value)) {
          error = "Email inválido";
        }
        break;

      case "phone":
        if (!value || !isValidPhone(value)) {
          error = "Teléfono inválido (mínimo 7 dígitos)";
        }
        break;

      case "productType":
        if (!value) {
          error = "Seleccione tipo de producto";
        }
        break;

      case "product":
        if (!value) {
          error = "Seleccione producto";
        }
        break;

      case "material":
        if (!value) {
          error = "Seleccione material";
        }
        break;

      case "width":
        if (!value || Number(value) <= 0) {
          error = "Seleccione ancho válido";
        }
        break;

      case "height":
        if (!value || Number(value) <= 0) {
          error = "Seleccione alto válido";
        }
        break;

      case "quantity":
        if (!value || Number(value) < 1) {
          error = "Cantidad inválida";
        }
        break;

      case "deliveryDate":
        if (!value) {
          error = "Seleccione fecha estimada de entrega";
        } else {
          const sel = new Date(value);
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);
          if (sel < hoy) {
            error = "La fecha debe ser hoy o posterior";
          }
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return error;
  }, []);

  // Validar campo con debounce
  const debouncedValidateField = useCallback(
    (field, value, allValues) => {
      const debouncedFn = debounce(() => {
        validateField(field, value, allValues);
      }, 300);
      debouncedFn();
    },
    [validateField]
  );

  // Marcar campo como tocado
  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  // Validar todos los campos
  const validateAll = useCallback((form, details) => {
    const err = {};

    // Validar formulario básico
    if (!form.name || !form.name.trim()) err.name = "Nombre requerido";
    if (!form.company || !form.company.trim())
      err.company = "Empresa requerida";
    if (!isValidEmail(form.email || "")) err.email = "Email inválido";
    if (!isValidPhone(form.phone || ""))
      err.phone = "Teléfono inválido (mínimo 7 dígitos)";

    // Validar detalles
    if (!details.productType) err.productType = "Seleccione tipo de producto";
    if (!details.product) err.product = "Seleccione producto";
    if (!details.material) err.material = "Seleccione material";
    if (!details.width || Number(details.width) <= 0)
      err.width = "Seleccione ancho válido";
    if (!details.height || Number(details.height) <= 0)
      err.height = "Seleccione alto válido";
    if (!details.quantity || Number(details.quantity) < 1)
      err.quantity = "Cantidad inválida";
    if (!details.deliveryDate)
      err.deliveryDate = "Seleccione fecha estimada de entrega";

    // Validar fecha
    if (details.deliveryDate) {
      const sel = new Date(details.deliveryDate);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (sel < hoy) err.deliveryDate = "La fecha debe ser hoy o posterior";
    }

    setErrors(err);

    // Marcar todos los campos como tocados
    const allFields = [
      "name",
      "company",
      "email",
      "phone",
      "productType",
      "product",
      "material",
      "width",
      "height",
      "quantity",
      "deliveryDate",
    ];
    const touchedFields = {};
    allFields.forEach((field) => {
      touchedFields[field] = true;
    });
    setTouched(touchedFields);

    return Object.keys(err).length === 0;
  }, []);

  // Limpiar error de un campo
  const clearError = useCallback((field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Limpiar todos los errores
  const clearAllErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  // Hacer focus en el primer campo con error
  const focusFirstError = useCallback(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [errors]);

  return {
    errors,
    touched,
    validateField,
    debouncedValidateField,
    handleBlur,
    validateAll,
    clearError,
    clearAllErrors,
    focusFirstError,
  };
};
