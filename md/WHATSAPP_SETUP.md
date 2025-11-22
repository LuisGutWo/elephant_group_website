# Configuración de WhatsApp para Formulario de Cotización

## 📱 Cómo funciona

Cuando un usuario completa el formulario de cotización y hace clic en "Solicitar cotización":

1. El sistema valida todos los campos del formulario
2. Formatea toda la información en un mensaje organizado
3. Muestra un mensaje de éxito al usuario
4. Abre WhatsApp Web/App automáticamente con el mensaje pre-escrito
5. El mensaje se envía al número de WhatsApp de la empresa
6. Como respaldo, también se envía un email (opcional)

## ⚙️ Configuración

### Paso 1: Configurar el número de WhatsApp

Edita el archivo `.env.local` y configura tu número de WhatsApp:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
```

**Formato importante:**
- Código de país + número
- SIN el signo "+"
- SIN espacios
- SIN guiones
- SIN paréntesis

**Ejemplos:**
- Chile: `56912345678` (56 + 9 + número)
- México: `5215512345678` (52 + 1 + código área + número)
- Argentina: `5491112345678` (54 + 9 + código área + número)
- Colombia: `573001234567` (57 + código área + número)
- Perú: `51987654321` (51 + número)
- España: `34612345678` (34 + número)

### Paso 2: Reiniciar el servidor de desarrollo

Después de modificar `.env.local`, reinicia el servidor:

```bash
npm run dev
```

## 🎯 Flujo de usuario

1. Usuario completa el formulario con:
   - Datos personales (nombre, empresa, email, teléfono)
   - Detalles del producto (tipo, material, medidas, cantidad, etc.)
   - Archivo adjunto (opcional)
   - Fecha de entrega estimada
   - Comentarios adicionales

2. Al hacer clic en "Solicitar cotización":
   - ✅ Validación de todos los campos
   - ✅ Mensaje de éxito: "¡Perfecto! Serás redirigido a WhatsApp. Te responderemos de inmediato."
   - ✅ Se abre WhatsApp automáticamente con el mensaje formateado
   - ✅ El formulario se limpia automáticamente

3. El mensaje en WhatsApp incluye:
   ```
   🔔 NUEVA COTIZACIÓN EXPRESS
   
   👤 DATOS DEL CLIENTE
   • Nombre: [nombre completo]
   • Empresa: [nombre empresa]
   • Email: [correo]
   • Teléfono: [teléfono]
   
   📦 DETALLES DEL PRODUCTO
   • Tipo: [tipo de producto]
   • Producto: [producto específico]
   • Material: [material]
   • Medidas: [ancho]cm x [alto]cm
   • Cantidad: [cantidad]
   • Archivo adjunto: [nombre del archivo]
   • Fecha de entrega: [fecha]
   • Comentarios: [comentarios adicionales]
   ```

## 📲 Comportamiento en diferentes dispositivos

### En Desktop (PC/Mac):
- Se abre WhatsApp Web en una nueva pestaña
- Si no tiene WhatsApp Web activo, le pedirá escanear código QR

### En Mobile (iOS/Android):
- Se abre la app de WhatsApp directamente
- El mensaje ya está escrito, solo debe presionar enviar

## 🔄 Respuesta automática

Para responder automáticamente cuando recibas el mensaje, puedes:

### Opción 1: Respuesta Manual Rápida
Crear mensajes guardados en WhatsApp Business para responder rápidamente.

### Opción 2: WhatsApp Business API (Recomendado)
Para respuestas verdaderamente automáticas, necesitarás:
1. Cuenta de WhatsApp Business API
2. Proveedor como Twilio, MessageBird, o similar
3. Configurar webhooks para respuestas automáticas

Ejemplo de respuesta automática sugerida:
```
¡Hola [nombre]! 👋

Gracias por tu solicitud de cotización. Hemos recibido tu pedido de:
• [Producto] - [Cantidad] unidades
• Material: [Material]
• Entrega: [Fecha]

Nuestro equipo está revisando tu solicitud y te enviaremos una cotización detallada en las próximas 2 horas.

¿Necesitas algo más mientras tanto? 😊
```

## 🛠️ Personalización

### Modificar el formato del mensaje

Edita el archivo `src/components/InnerPages/Contact/Form.jsx` en la función `handleSubmit`:

```javascript
const message = `
🔔 *NUEVA COTIZACIÓN EXPRESS*
... tu formato personalizado ...
`.trim();
```

### Cambiar el tiempo de redirección

Por defecto se redirige después de 1 segundo. Para cambiar:

```javascript
setTimeout(() => {
  window.open(whatsappURL, "_blank");
}, 2000); // 2 segundos
```

## 📧 Email de respaldo

El sistema también envía un email como respaldo. Para desactivarlo, comenta estas líneas en `Form.jsx`:

```javascript
// Código comentado en handleSubmit
```

## 🧪 Pruebas

1. Completa el formulario con datos de prueba
2. Haz clic en "Solicitar cotización"
3. Verifica que:
   - Aparece mensaje de éxito
   - Se abre WhatsApp
   - El mensaje está completo y bien formateado
   - Tu número recibe el mensaje

## ❓ Problemas comunes

### WhatsApp no se abre
- Verifica que el número esté en formato correcto
- Asegúrate de que WhatsApp esté instalado
- Prueba el número manualmente: `https://wa.me/[TU_NUMERO]`

### El mensaje está mal formateado
- WhatsApp Web interpreta `*texto*` como negrita
- Los saltos de línea se respetan
- Los emojis son opcionales pero mejoran la experiencia

### Variables de entorno no se cargan
- Reinicia el servidor de desarrollo
- Verifica que el archivo sea `.env.local` (no `.env`)
- Las variables que comienzan con `NEXT_PUBLIC_` son accesibles en el cliente

## 🚀 Próximos pasos

Para una solución más profesional, considera:
1. **WhatsApp Business API** para respuestas automáticas
2. **CRM Integration** para guardar leads automáticamente
3. **Analytics** para trackear conversiones
4. **Chatbot** para respuestas 24/7

## 📞 Soporte

Si tienes problemas con la configuración, verifica:
- [ ] Número de WhatsApp en formato correcto
- [ ] Archivo `.env.local` guardado
- [ ] Servidor reiniciado después de cambios
- [ ] WhatsApp instalado en el dispositivo
