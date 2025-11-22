# ⚡ Configuración Rápida de WhatsApp

## 🎯 Lo que se hizo

Tu formulario de cotización ahora envía los datos directamente a WhatsApp de forma organizada y muestra una respuesta inmediata al usuario.

## 📝 Pasos para activarlo

### 1. Configurar tu número de WhatsApp

Abre el archivo `.env.local` y cambia esta línea:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
```

Reemplaza `56912345678` con tu número de WhatsApp en este formato:
- **Código de país + número completo**
- **Sin el signo +**
- **Sin espacios ni guiones**

**Ejemplos por país:**
- 🇨🇱 Chile: `56912345678` (56 + tu número con el 9)
- 🇲🇽 México: `5215512345678` (52 + 1 + tu número)
- 🇦🇷 Argentina: `5491112345678` (54 + 9 + tu número)
- 🇨🇴 Colombia: `573001234567` (57 + tu número)
- 🇵🇪 Perú: `51987654321` (51 + tu número)

### 2. Reiniciar el servidor

```bash
npm run dev
```

### 3. ¡Listo! Prueba tu formulario

Llena el formulario y haz clic en "Solicitar cotización".

## ✨ ¿Qué verá el usuario?

1. **Mensaje de éxito inmediato:**
   > "¡Perfecto! Serás redirigido a WhatsApp. Te responderemos de inmediato."

2. **WhatsApp se abre automáticamente** con un mensaje pre-formateado:

```
🔔 NUEVA COTIZACIÓN EXPRESS

👤 DATOS DEL CLIENTE
• Nombre: Juan Pérez
• Empresa: Mi Empresa S.A.
• Email: juan@empresa.com
• Teléfono: +56912345678

📦 DETALLES DEL PRODUCTO
• Tipo: Impreso
• Producto: Tarjeta de presentación
• Material: Papel couchê
• Medidas: 85cm x 55cm
• Cantidad: 500
• Fecha de entrega: 2025-12-01
• Comentarios: Acabado mate

_Enviado desde el formulario web_
```

3. **El usuario solo presiona "Enviar" en WhatsApp** y listo

## 🎨 Personalizar el mensaje

Si quieres cambiar el formato del mensaje, edita:
- Archivo: `src/components/InnerPages/Contact/Form.jsx`
- Busca: `const message = `
- Modifica el texto/emojis como prefieras

## 📱 Funciona en todos los dispositivos

- **Desktop:** Abre WhatsApp Web
- **Mobile:** Abre la app de WhatsApp directamente

## 🔧 Respuesta automática (opcional)

Para responder automáticamente cuando recibas el mensaje:

**Opción simple:** Usa WhatsApp Business y crea respuestas rápidas

**Opción avanzada:** WhatsApp Business API con Twilio/MessageBird para respuestas automáticas completas

## 📚 Documentación completa

Ver `WHATSAPP_SETUP.md` para más detalles sobre configuración avanzada.

---

**¿Problemas?** Verifica que:
- ✅ El número esté en formato correcto (sin + ni espacios)
- ✅ Hayas reiniciado el servidor después de editar `.env.local`
- ✅ WhatsApp esté instalado en tu dispositivo
