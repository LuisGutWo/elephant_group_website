import { useState, useCallback } from "react";
import { validateFile, compressImage, toBase64 } from "../formHelpers";

/**
 * Hook personalizado para manejar la subida y procesamiento de archivos
 */
export const useFileUpload = () => {
  const [pendingFile, setPendingFile] = useState(null);
  const [fileDetails, setFileDetails] = useState({
    fileName: "",
    fileData: null,
    fileSize: null,
    fileType: null,
  });
  const [fileError, setFileError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Manejar selección de archivo (lazy loading - no convierte inmediatamente)
  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPendingFile(null);
      setFileDetails({
        fileName: "",
        fileData: null,
        fileSize: null,
        fileType: null,
      });
      setFileError(null);
      return;
    }

    // Validar archivo
    const validation = validateFile(file);

    if (!validation.valid) {
      setFileError(validation.error);
      setPendingFile(null);
      setFileDetails({
        fileName: "",
        fileData: null,
        fileSize: null,
        fileType: null,
      });
      e.target.value = ""; // Limpiar input
      return;
    }

    // Limpiar errores previos
    setFileError(null);

    // Guardar archivo pendiente (aún no convertido)
    setPendingFile(file);
    setFileDetails({
      fileName: file.name,
      fileData: null, // No convertido aún
      fileSize: file.size,
      fileType: file.name.split(".").pop()?.toLowerCase(),
    });

    console.log("📎 Archivo seleccionado:", {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      type: file.type,
    });
  }, []);

  // Procesar archivo (comprimir si es imagen y convertir a base64)
  const processFile = useCallback(async () => {
    if (!pendingFile) return null;

    setIsProcessing(true);
    try {
      let fileToProcess = pendingFile;

      // Si es imagen, comprimir primero
      const imageTypes = ["jpg", "jpeg", "png"];
      const ext = pendingFile.name.split(".").pop()?.toLowerCase();

      if (imageTypes.includes(ext)) {
        console.log("🔄 Comprimiendo imagen...");
        fileToProcess = await compressImage(pendingFile);
      }

      // Convertir a base64
      console.log("🔄 Convirtiendo archivo a base64...");
      const dataUrl = await toBase64(fileToProcess);
      const base64Size = (dataUrl.length * 0.75) / 1024 / 1024;

      console.log(
        `✅ Archivo procesado. Tamaño base64: ${base64Size.toFixed(2)}MB`
      );

      // Actualizar detalles con datos procesados
      const processedDetails = {
        fileName: pendingFile.name,
        fileData: dataUrl,
        fileSize: fileToProcess.size,
        fileType: ext,
      };

      setFileDetails(processedDetails);
      return processedDetails;
    } catch (err) {
      console.error("❌ Error procesando archivo:", err);
      setFileError("No se pudo procesar el archivo. Intenta con otro archivo.");
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [pendingFile]);

  // Limpiar archivo
  const clearFile = useCallback(() => {
    setPendingFile(null);
    setFileDetails({
      fileName: "",
      fileData: null,
      fileSize: null,
      fileType: null,
    });
    setFileError(null);

    // Limpiar también el input file
    const fileInput = document.getElementById("file");
    if (fileInput) {
      fileInput.value = "";
    }
  }, []);

  return {
    pendingFile,
    fileDetails,
    fileError,
    isProcessing,
    handleFileSelect,
    processFile,
    clearFile,
  };
};
