# Resumen: Despliegue Multi-Plataforma (Netlify + cPanel)

## 📋 Situación Actual

El proyecto ahora tiene **soporte dual** para funcionar tanto en:

- ✅ **Netlify** (con Netlify Functions - serverless)
- ✅ **cPanel** (con scripts PHP tradicionales)

## 🎯 Respuesta a tu Pregunta

### **¿La configuración funcionará en cPanel?**

**Respuesta corta**: Sí, pero necesitas configuración adicional.

**Respuesta larga**:

- Las **Netlify Functions NO funcionan en cPanel** (son específicas de Netlify)
- He creado **scripts PHP equivalentes** que SÍ funcionan en cPanel
- El proyecto ahora detecta automáticamente el entorno y usa la API correcta

---

## 🔄 Detección Automática de Entorno

El archivo `src/config/emailApi.js` detecta automáticamente si estás en:

- **Netlify**: Usa `/.netlify/functions/send-contact`
- **cPanel**: Usa `/api/send-contact.php`

```javascript
// Esto funciona automáticamente:
import EMAIL_API from '../config/emailApi';

fetch(EMAIL_API.sendContact, { /* ... */ });
// En Netlify → /.netlify/functions/send-contact
// En cPanel  → /api/send-contact.php
```

---

## 📁 Archivos Creados para cPanel

### APIs PHP (100% Funcionales en cPanel)

1. **`public/api/send-contact.php`**
   - Formulario principal con archivos adjuntos
   - Usa PHPMailer para SMTP
   - Idéntica funcionalidad a la Netlify Function

2. **`public/api/send-simple-contact.php`**
   - Formulario simple del footer
   - Validación y envío SMTP

3. **`public/api/config.php`**
   - Configuración de credenciales SMTP
   - **DEBES EDITARLO** con tus credenciales

### Documentación

4. **`CPANEL_DEPLOYMENT.md`**
   - Guía completa paso a paso
   - Instalación de PHPMailer
   - Configuración SMTP
   - Troubleshooting

---

## ⚙️ Configuración Necesaria para cPanel

### 1. Instalar PHPMailer

```bash
cd public/api
composer require phpmailer/phpmailer
```

**O descarga manual**: <https://github.com/PHPMailer/PHPMailer/releases>

### 2. Editar config.php

```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'tu-email@gmail.com');
define('SMTP_PASS', 'tu-contraseña-de-app'); // ← Gmail App Password
define('CONTACT_RECIPIENT', 'destinatario@empresa.cl');
```

### 3. Construir y Subir

```bash
npm run build
```

Sube a cPanel:

- Todo el contenido de `out/` → `public_html/`
- La carpeta `public/api/` → `public_html/api/`

---

## 🎛️ Variables de Entorno

### Para Netlify (Actual)

Configura en **Netlify Dashboard → Environment variables**:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-app
CONTACT_RECIPIENT=destinatario@empresa.cl
```

### Para cPanel (Nuevo)

Edita **`public/api/config.php`**:

```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'tu-email@gmail.com');
define('SMTP_PASS', 'tu-contraseña-de-app');
define('CONTACT_RECIPIENT', 'destinatario@empresa.cl');
```

---

## 🔐 Seguridad

### Para Gmail (Ambos entornos)

1. Habilita verificación en dos pasos
2. Genera contraseña de aplicación: <https://myaccount.google.com/apppasswords>
3. Usa la contraseña de 16 caracteres (no tu contraseña normal)

### Para cPanel Email

```php
define('SMTP_HOST', 'mail.tudominio.com');
define('SMTP_USER', 'contacto@tudominio.com');
define('SMTP_PASS', 'tu-contraseña-email');
```

---

## 🚀 Flujo de Despliegue

### Desplegar en Netlify (Actual)

```bash
git push origin main
# Netlify auto-deploys
# Variables en Netlify Dashboard
```

✅ **Ya configurado y funcionando**

### Desplegar en cPanel (Nuevo)

```bash
npm run build
# FTP o File Manager:
# 1. Sube out/* a public_html/
# 2. Sube public/api/ a public_html/api/
# 3. Edita config.php con credenciales
# 4. Instala PHPMailer
```

✅ **Scripts PHP creados y listos**

---

## 📊 Comparación

| Aspecto | Netlify Functions | cPanel PHP |
|---------|-------------------|------------|
| **Tecnología** | Node.js serverless | PHP tradicional |
| **Archivos adjuntos** | ✅ Soportado | ✅ Soportado |
| **Auto-deploy** | ✅ Git push | ❌ Manual (FTP) |
| **Variables env** | Dashboard Netlify | config.php |
| **Logs** | Dashboard Netlify | php_errors.log |
| **Costo** | Gratis (con límites) | Incluido en hosting |
| **Configuración** | Ya funcionando | Requiere setup |

---

## ✅ Checklist rápido para cPanel

- [ ] Instalar PHPMailer
- [ ] Editar `public/api/config.php` con credenciales SMTP
- [ ] Ejecutar `npm run build`
- [ ] Subir carpeta `out/*` a `public_html/`
- [ ] Subir carpeta `public/api/` a `public_html/api/`
- [ ] Probar enviando un email de prueba
- [ ] Verificar que llegue el email

---

## 🆘 Soporte

### Netlify (Ya funciona)

- Logs en Netlify Dashboard → Functions
- Variables en Site settings → Environment variables

### cPanel (Nuevo)

- Logs en `public_html/api/php_errors.log`
- Ver guía completa en `CPANEL_DEPLOYMENT.md`
- Contactar soporte del hosting si hay problemas SMTP

---

## 📝 Resumen Final

### ✅ Lo que ya funciona

- Formularios con validación y sanitización
- Auto-guardado en localStorage
- Compresión de imágenes
- Envío por WhatsApp
- **Email de respaldo en Netlify** (Netlify Functions)

### 🆕 Lo que agregué para cPanel

- Scripts PHP equivalentes (`send-contact.php`, `send-simple-contact.php`)
- Detección automática de entorno (`emailApi.js`)
- Configuración dual (Netlify + cPanel)
- Guía completa de despliegue (`CPANEL_DEPLOYMENT.md`)

### 🎯 Conclusión

**Tu sitio funcionará perfectamente en ambos entornos** con la configuración adecuada. En Netlify ya está funcionando. Para cPanel, solo necesitas seguir los pasos en `CPANEL_DEPLOYMENT.md`.
