# Guía de Despliegue en cPanel

## ⚠️ Problema con Netlify Functions en cPanel

Las **Netlify Functions** (carpeta `netlify/functions/`) **NO funcionan en cPanel** porque:

1. Son específicas de la plataforma Netlify (serverless)
2. cPanel no tiene soporte para funciones serverless
3. cPanel típicamente usa **PHP** para el backend

## ✅ Solución: APIs PHP para cPanel

He creado scripts PHP que reemplazan las Netlify Functions y son **100% compatibles con cPanel**.

---

## 📁 Archivos PHP Creados

### `public/api/send-contact.php`

- Reemplaza `/.netlify/functions/send-contact`
- Maneja formulario principal con archivos adjuntos
- Usa PHPMailer para envío SMTP

### `public/api/send-simple-contact.php`

- Reemplaza `/.netlify/functions/send-simple-contact`
- Maneja formulario simple del footer

### `public/api/config.php`

- Archivo de configuración con credenciales SMTP
- **IMPORTANTE**: Configurar antes de usar

---

## 🚀 Pasos para Desplegar en cPanel

### 1. Instalar PHPMailer

**Opción A: Via Composer (Recomendado)**

```bash
cd public/api
composer require phpmailer/phpmailer
```

**Opción B: Descarga Manual**

1. Descarga PHPMailer: <https://github.com/PHPMailer/PHPMailer/releases>
2. Extrae en `public/api/PHPMailer/`
3. Debe quedar así:

   ```
   public/api/
   ├── PHPMailer/
   │   ├── PHPMailer.php
   │   ├── SMTP.php
   │   └── Exception.php
   ├── config.php
   ├── send-contact.php
   └── send-simple-contact.php
   ```

### 2. Configurar Credenciales SMTP

Edita `public/api/config.php`:

```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'tu-email@gmail.com');
define('SMTP_PASS', 'tu-contraseña-de-aplicación');
define('CONTACT_RECIPIENT', 'destinatario@empresa.cl');
```

#### Para Gmail

1. Habilita verificación en dos pasos
2. Genera contraseña de aplicación en: <https://myaccount.google.com/apppasswords>
3. Usa la contraseña de 16 caracteres en `SMTP_PASS`

#### Para cPanel Email

```php
define('SMTP_HOST', 'mail.tudominio.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'contacto@tudominio.com');
define('SMTP_PASS', 'tu-contraseña-email');
define('CONTACT_RECIPIENT', 'admin@tudominio.com');
```

### 3. Proteger config.php

Crea `.htaccess` en `public/api/`:

```apache
<Files "config.php">
  Order Allow,Deny
  Deny from all
</Files>
```

### 4. Construir el Proyecto

```bash
npm run build
```

Esto genera la carpeta `out/` con los archivos estáticos.

### 5. Subir a cPanel

**Via File Manager:**

1. Accede a cPanel → File Manager
2. Navega a `public_html/` (o `www/`)
3. Sube todo el contenido de la carpeta `out/`
4. Sube la carpeta `public/api/` completa

**Via FTP:**

```
public_html/
├── index.html
├── _next/
├── dark/
├── light/
├── api/           ← IMPORTANTE: Subir esta carpeta
│   ├── PHPMailer/
│   ├── config.php
│   ├── send-contact.php
│   └── send-simple-contact.php
└── ... (otros archivos de out/)
```

### 6. Actualizar URLs en el Frontend

Edita `src/components/InnerPages/Contact/Form.jsx`:

```javascript
// Cambiar de:
const emailResponse = await fetch("/.netlify/functions/send-contact", {

// A:
const emailResponse = await fetch("/api/send-contact.php", {
```

Edita `src/components/Main/Footer.jsx`:

```javascript
// Cambiar de:
const response = await fetch("/.netlify/functions/send-simple-contact", {

// A:
const response = await fetch("/api/send-simple-contact.php", {
```

**Luego vuelve a construir:**

```bash
npm run build
```

Y sube de nuevo los archivos del `out/`.

### 7. Configurar Permisos (Opcional)

Via SSH o cPanel Terminal:

```bash
chmod 644 public_html/api/*.php
chmod 600 public_html/api/config.php
```

---

## 🧪 Probar el Envío de Emails

### Desde cPanel

Crea un archivo `test-email.php` en `public_html/`:

```php
<?php
require_once 'api/config.php';
require_once 'api/PHPMailer/PHPMailer.php';
require_once 'api/PHPMailer/SMTP.php';
require_once 'api/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;

    $mail->setFrom(SMTP_USER, 'Test');
    $mail->addAddress(CONTACT_RECIPIENT);
    $mail->Subject = 'Email de Prueba';
    $mail->Body = 'Si recibes este email, la configuración SMTP funciona correctamente.';

    $mail->send();
    echo '✅ Email enviado correctamente!';
} catch (Exception $e) {
    echo '❌ Error: ' . $e->getMessage();
}
?>
```

Visita: `https://tudominio.com/test-email.php`

**⚠️ ELIMINA `test-email.php` después de probar.**

---

## 🔒 Seguridad Adicional

### 1. Agregar CAPTCHA (Recomendado)

En los archivos PHP, agrega verificación de Google reCAPTCHA:

```php
// En send-contact.php, después de validar campos:
$recaptchaSecret = 'tu-secret-key';
$recaptchaResponse = $data['recaptchaToken'] ?? '';

$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}");
$captchaData = json_decode($verify);

if (!$captchaData->success) {
    http_response_code(400);
    echo json_encode(['message' => 'Verificación CAPTCHA fallida']);
    exit;
}
```

### 2. Rate Limiting

Agrega al inicio de los archivos PHP:

```php
session_start();
$lastSubmit = $_SESSION['last_submit'] ?? 0;
$now = time();

if ($now - $lastSubmit < 5) {
    http_response_code(429);
    echo json_encode(['message' => 'Por favor espera 5 segundos entre envíos']);
    exit;
}

$_SESSION['last_submit'] = $now;
```

### 3. Logs de Errores

Los archivos PHP ya tienen logs habilitados. Revisa en:

- `public_html/api/php_errors.log`

---

## 🐛 Troubleshooting

### Error: "SMTP connect() failed"

- Verifica que las credenciales SMTP sean correctas
- Asegúrate de usar el puerto correcto (587 o 465)
- Algunos hosting bloquean el puerto 587, usa 465
- Verifica con tu proveedor de hosting si permiten SMTP externo

### Error: "Could not instantiate mail function"

- Tu hosting puede requerir usar `mail()` de PHP en lugar de SMTP
- Comenta las líneas SMTP y usa:

  ```php
  $mail->isMail(); // En lugar de $mail->isSMTP();
  ```

### Email no llega

- Revisa spam
- Revisa logs en `php_errors.log`
- Verifica que `CONTACT_RECIPIENT` esté correcto
- Prueba enviando a otro email

### 500 Internal Server Error

- Revisa permisos de archivos (644 para .php)
- Verifica que PHPMailer esté instalado correctamente
- Revisa logs de PHP en cPanel → Error Log

---

## 📊 Comparación: Netlify vs cPanel

| Característica | Netlify Functions | cPanel PHP |
|----------------|-------------------|------------|
| Lenguaje | JavaScript/Node.js | PHP |
| Serverless | ✅ Sí | ❌ No (servidor tradicional) |
| Configuración | Variables de entorno | config.php |
| Archivos adjuntos | ✅ Soportado | ✅ Soportado |
| SMTP | ✅ Nodemailer | ✅ PHPMailer |
| Deployment | Git push automático | FTP/File Manager manual |
| Logs | Dashboard Netlify | php_errors.log |
| Costo | Gratis (límites) | Incluido en hosting |

---

## ✅ Checklist de Despliegue

- [ ] Instalar PHPMailer en `public/api/PHPMailer/`
- [ ] Configurar credenciales en `config.php`
- [ ] Proteger `config.php` con `.htaccess`
- [ ] Actualizar URLs en Form.jsx y Footer.jsx
- [ ] Construir proyecto: `npm run build`
- [ ] Subir contenido de `out/` a `public_html/`
- [ ] Subir carpeta `api/` a `public_html/api/`
- [ ] Probar con `test-email.php`
- [ ] Eliminar `test-email.php`
- [ ] Probar formularios en el sitio web
- [ ] Verificar que los emails lleguen correctamente

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa `public_html/api/php_errors.log`
2. Verifica los logs de cPanel → Error Log
3. Prueba las credenciales SMTP con una herramienta externa
4. Contacta al soporte técnico de tu hosting para verificar restricciones SMTP

---

## 📝 Notas Importantes

- **NO subas `config.php` con credenciales reales a GitHub**
- Usa `.gitignore` para excluir: `public/api/config.php`
- Los archivos PHP deben estar en `public/` para que Next.js los copie al `out/`
- Las Netlify Functions pueden permanecer en el repo (se ignoran en cPanel)
- Considera usar variables de entorno de cPanel si están disponibles
