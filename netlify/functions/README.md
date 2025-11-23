# Netlify Functions - Email Service

Este directorio contiene las Netlify Functions para el envío de emails desde el sitio web.

## ¿Por qué Netlify Functions?

El proyecto usa `output: "export"` en Next.js para generar un sitio estático. Las API Routes de Next.js requieren un servidor Node.js, por lo que no son compatibles con exportación estática. Netlify Functions proporcionan una alternativa serverless perfecta.

## Funciones Disponibles

### `send-contact.js`

- **Ruta**: `/.netlify/functions/send-contact`
- **Método**: POST
- **Propósito**: Envío de cotizaciones EXPRESS con archivos adjuntos
- **Características**:
  - Soporte para archivos adjuntos (imágenes, PDFs, documentos)
  - Validación de datos completa
  - HTML estilizado profesional
  - Manejo de archivos grandes
  - CORS habilitado

### `send-simple-contact.js`

- **Ruta**: `/.netlify/functions/send-simple-contact`
- **Método**: POST
- **Propósito**: Mensajes simples desde el footer
- **Características**:
  - Validación básica
  - HTML estilizado limpio
  - Reply-to configurado
  - CORS habilitado

## Variables de Entorno Requeridas

Configura estas variables en Netlify Dashboard → Site settings → Environment variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
CONTACT_RECIPIENT=destinatario@empresa.cl
```

## Desarrollo Local

Para probar las funciones localmente:

1. Instala Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Configura variables locales en `.env`:

   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=tu-email@gmail.com
   SMTP_PASS=tu-contraseña
   CONTACT_RECIPIENT=destinatario@empresa.cl
   ```

3. Ejecuta el proyecto con Netlify Dev:

   ```bash
   netlify dev
   ```

   Esto iniciará un servidor local que emula el entorno de Netlify, incluyendo las funciones.

## Logs y Debugging

```bash
npm install -g netlify-cli
```

2. Configura variables locales en `.env`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña
CONTACT_RECIPIENT=destinatario@empresa.cl
```

3. Ejecuta el proyecto con Netlify Dev:

```bash
netlify dev
```

Esto iniciará un servidor local que emula el entorno de Netlify, incluyendo las funciones.

## Logs y Debugging

En producción (Netlify):

- Ve a Functions → Logs en el dashboard de Netlify
- Cada función genera logs detallados con emojis para fácil lectura

En desarrollo local:

- Los logs aparecen en la consola del terminal

## Estructura de Respuesta

### Éxito

```json
{
  "message": "Correo enviado correctamente.",
  "messageId": "abc123@smtp.gmail.com",
  "hasAttachment": true
}
```

### Error

```json
{
  "message": "Error enviando correo.",
  "error": "Descripción del error"
}
```

### Sin configuración SMTP

```json
{
  "message": "Mensaje recibido correctamente. (Email no configurado)",
  "warning": "SMTP not configured"
}
```

## Limitaciones

- **Timeout**: 10 segundos por función (configurable en `netlify.toml`)
- **Tamaño del payload**: Límite de Netlify es 6MB
- **Archivos adjuntos**: Se recomienda comprimir imágenes antes de enviar
- **Rate limiting**: No implementado a nivel de función (se maneja en el frontend)

## Seguridad

- ✅ Validación de email con regex
- ✅ Sanitización de inputs (DOMPurify en frontend)
- ✅ CORS configurado
- ✅ Variables de entorno seguras
- ✅ Logs que no exponen información sensible
- ✅ Manejo robusto de errores

## Troubleshooting

### Función no responde

1. Verifica que las variables de entorno estén configuradas en Netlify
2. Revisa los logs en Netlify Dashboard → Functions
3. Asegúrate de que el sitio se haya redeployado después de agregar variables

### Email no llega

1. Verifica la carpeta de spam
2. Revisa los logs de la función para ver el `messageId`
3. Verifica que `CONTACT_RECIPIENT` esté correctamente configurado
4. Prueba las credenciales SMTP con otra herramienta

### Error de CORS

- Las funciones ya tienen CORS habilitado
- Si persiste, verifica que estés usando el dominio correcto

## Monitoreo

Netlify proporciona métricas automáticas:

- Número de invocaciones
- Duración de ejecución
- Errores
- Logs en tiempo real

Accede a estas métricas en: Netlify Dashboard → Functions → [Nombre de la función]
