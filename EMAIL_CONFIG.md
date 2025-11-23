# Configuración de Email para Elephant Group Website

## Variables de Entorno Requeridas

Para habilitar el envío de emails desde los formularios, necesitas configurar las siguientes variables de entorno en un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación

# Destinatario de los emails
CONTACT_RECIPIENT=destinatario@elephantgroup.cl
```

## Configuración en Netlify

Este proyecto usa **Netlify Functions** para el envío de emails. Para configurar las variables de entorno en Netlify:

1. Ve a tu proyecto en Netlify Dashboard
2. Site settings → Environment variables
3. Agrega las siguientes variables:
   - `SMTP_HOST` (ejemplo: `smtp.gmail.com`)
   - `SMTP_PORT` (ejemplo: `587`)
   - `SMTP_USER` (tu email)
   - `SMTP_PASS` (tu contraseña de aplicación)
   - `CONTACT_RECIPIENT` (email de destino)
4. Redeploy el sitio para que las variables tomen efecto

## Configuración para Gmail

Si usas Gmail, necesitas crear una **Contraseña de Aplicación**:

1. Ve a tu cuenta de Google: <https://myaccount.google.com/>
2. Seguridad → Verificación en dos pasos (debe estar activada)
3. En la parte inferior, selecciona "Contraseñas de aplicaciones"
4. Genera una nueva contraseña para "Correo"
5. Copia la contraseña de 16 caracteres (sin espacios)
6. Úsala en `SMTP_PASS`

## Otros Proveedores SMTP

### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=tu-email@outlook.com
SMTP_PASS=tu-contraseña
```

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=tu-api-key-de-sendgrid
```

### Amazon SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=tu-smtp-username
SMTP_PASS=tu-smtp-password
```

## Funcionalidades de Email

### Formulario Principal (Form.jsx)

- ✅ Envío de cotizaciones EXPRESS con todos los detalles
- ✅ Soporte para archivos adjuntos (imágenes, PDFs, documentos)
- ✅ Compresión automática de imágenes antes de enviar
- ✅ Email de respaldo en segundo plano (no bloquea el flujo principal)
- ✅ Validación de tamaño (máximo 10MB con archivos adjuntos)
- ✅ HTML estilizado con todos los detalles del producto
- ✅ WhatsApp como canal principal + email como respaldo

### Formulario Simple (Footer.jsx)

- ✅ Mensajes rápidos desde el footer
- ✅ Validación de campos requeridos
- ✅ HTML estilizado con información del cliente
- ✅ Configuración reply-to automática para responder directamente

## Netlify Functions Creadas

> ⚠️ **Importante**: Este proyecto usa **Netlify Functions** en lugar de Next.js API Routes porque está configurado con `output: "export"` para exportación estática.

### `/.netlify/functions/send-contact` (POST)

Maneja el formulario principal de cotizaciones con soporte para archivos adjuntos.

**Body esperado:**

```json
{
  "name": "Juan Pérez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.cl",
  "phone": "+56 9 1234 5678",
  "message": "Mensaje opcional",
  "details": {
    "productType": "impreso",
    "product": "Volantes",
    "material": "Papel couchê",
    "width": "10",
    "height": "15",
    "quantity": "100",
    "deliveryDate": "2025-12-01",
    "comments": "Comentarios adicionales",
    "fileName": "diseño.jpg",
    "fileData": "data:image/jpeg;base64,/9j/4AAQ...",
    "fileSize": 524288
  }
}
```

### `/.netlify/functions/send-simple-contact` (POST)

Maneja el formulario simple del footer.

**Body esperado:**

```json
{
  "name": "María González",
  "email": "maria@email.com",
  "message": "Hola, me gustaría obtener más información..."
}
```

## Características de Seguridad

- ✅ Validación de email con regex
- ✅ Sanitización de inputs con DOMPurify
- ✅ Rate limiting (5 segundos entre envíos)
- ✅ Timeout de 30 segundos para prevenir bloqueos
- ✅ Verificación de conexión SMTP antes de enviar
- ✅ Manejo robusto de errores
- ✅ Logs detallados para debugging
- ✅ Límite de tamaño de payload (10MB)

## Testing

Para probar el envío de emails sin configurar SMTP:

1. Los endpoints responderán con `200 OK` incluso sin configuración
2. Retornarán: `{ message: "Mensaje recibido correctamente. (Email no configurado)", warning: "SMTP not configured" }`
3. Los logs en consola mostrarán toda la información recibida

## Troubleshooting

### Error: "Error de conexión SMTP"

- Verifica que las credenciales SMTP sean correctas
- Asegúrate de que el puerto sea el correcto (587 para TLS, 465 para SSL)
- Si usas Gmail, verifica que hayas creado una contraseña de aplicación

### Error: "Timeout del email de respaldo"

- El servidor SMTP puede estar lento
- Verifica tu conexión a internet
- El timeout está configurado a 30 segundos

### Email no llega

- Revisa la carpeta de spam
- Verifica que `CONTACT_RECIPIENT` esté correctamente configurado
- Revisa los logs del servidor para ver el `messageId`

### Archivo adjunto muy grande

- El sistema automáticamente remueve archivos >8MB para el email
- Se incluye una nota indicando que el archivo era muy grande
- El usuario aún recibe el archivo por WhatsApp

## Logs y Debugging

Los endpoints generan logs detallados en la consola del servidor:

- 📨 Llamada a la API
- 📝 Datos recibidos
- 📎 Archivos adjuntos detectados
- 📬 Email siendo enviado
- ✅ Email enviado exitosamente con Message ID
- ❌ Errores detallados si algo falla

## Ejemplo de `.env.local`

Crea este archivo en la raíz del proyecto:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contacto@elephantgroup.cl
SMTP_PASS=abcd efgh ijkl mnop

# Email Recipient
CONTACT_RECIPIENT=admin@elephantgroup.cl

# Optional: Node Environment
NODE_ENV=production
```

**⚠️ Importante:** Nunca subas el archivo `.env.local` a GitHub. Asegúrate de que esté en `.gitignore`.

## Dependencias Requeridas

Las siguientes dependencias ya están incluidas en `package.json`:

```json
{
  "nodemailer": "^6.9.8"
}
```

Si no está instalada, ejecuta:

```bash
npm install nodemailer
```

## Soporte

Para cualquier problema con la configuración de emails, contacta al equipo de desarrollo.
