<?php
/**
 * Configuración de Email para cPanel
 *
 * IMPORTANTE: Configurar estas constantes con tus credenciales SMTP
 * NO subir este archivo a GitHub con credenciales reales
 */

// Configuración SMTP
define('SMTP_HOST', 'smtp.gmail.com');          // Servidor SMTP
define('SMTP_PORT', 587);                        // Puerto (587 para TLS, 465 para SSL)
define('SMTP_USER', 'agutierrezwong@gmail.com');       // Tu email
define('SMTP_PASS', 'qhuvnpnvmshqwysk');     // Contraseña de aplicación
define('CONTACT_RECIPIENT', 'alberto_gutierrez@live.com'); // Email de destino

/**
 * INSTRUCCIONES PARA GMAIL:
 *
 * 1. Habilitar verificación en dos pasos en tu cuenta de Google
 * 2. Ir a: https://myaccount.google.com/apppasswords
 * 3. Generar una contraseña de aplicación para "Correo"
 * 4. Copiar la contraseña de 16 caracteres (sin espacios)
 * 5. Usar esa contraseña en SMTP_PASS
 *
 * OTROS PROVEEDORES:
 *
 * - Outlook: smtp-mail.outlook.com, puerto 587
 * - Yahoo: smtp.mail.yahoo.com, puerto 465 o 587
 * - cPanel Email: mail.tudominio.com, puerto 587 (consulta con tu hosting)
 */

// Validación básica
if (SMTP_HOST === 'smtp.gmail.com' && SMTP_USER === 'tu-email@gmail.com') {
    error_log('⚠️ ADVERTENCIA: Archivo config.php no configurado. Actualiza las credenciales SMTP.');
}
?>
