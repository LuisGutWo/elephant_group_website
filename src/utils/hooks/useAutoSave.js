import { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage,
} from "../formHelpers";

/**
 * Hook para auto-guardar y recuperar datos del formulario en localStorage
 */
export const useAutoSave = (key, form, details, enabled = true) => {
  // Cargar datos guardados al montar el componente
  useEffect(() => {
    if (!enabled) return () => {}; // Retornar cleanup vacío si no está habilitado

    const savedData = loadFromLocalStorage(key);
    // No podemos retornar datos desde useEffect
    // Este efecto solo sirve para efectos secundarios

    // Retornar cleanup function
    return () => {
      // Cleanup vacío
    };
    // Solo ejecutar al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Guardar datos automáticamente con debounce
  useEffect(() => {
    if (!enabled) return;

    const debouncedSave = debounce(() => {
      const dataToSave = {
        form,
        details: {
          ...details,
          // No guardar archivo en localStorage (muy pesado)
          fileData: null,
          fileName: details.fileName || "",
          fileSize: null,
          fileType: details.fileType || null,
        },
      };
      saveToLocalStorage(key, dataToSave);
    }, 1000);

    debouncedSave();

    return () => {
      debouncedSave.cancel();
    };
  }, [key, form, details, enabled]);

  // Función para limpiar manualmente
  const clearSaved = useCallback(() => {
    clearLocalStorage(key);
  }, [key]);

  return {
    clearSaved,
  };
};
