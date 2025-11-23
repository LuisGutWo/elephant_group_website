<?php
/**
 * API de envío de correos - Formulario Principal
 * Compatible con cPanel y hosting PHP tradicional
 *
 * IMPORTANTE: Configurar las variables en config.php
 */

// Configuración de errores
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
    exit;
}

// Cargar configuración
require_once __DIR__ . '/config.php';

// Obtener datos del POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Log de inicio
error_log("📨 API /send-contact llamado");
error_log("📝 Datos recibidos: " . print_r($data, true));

// Validar datos requeridos
$name = isset($data['name']) ? trim($data['name']) : '';
$company = isset($data['company']) ? trim($data['company']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';
$details = isset($data['details']) ? $data['details'] : [];

if (empty($name) || empty($company) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['message' => 'Faltan campos requeridos.']);
    exit;
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Email inválido.']);
    exit;
}

// Verificar configuración SMTP
if (empty(SMTP_HOST) || empty(SMTP_USER) || empty(SMTP_PASS)) {
    error_log("❌ Variables de entorno SMTP no configuradas");
    http_response_code(200);
    echo json_encode([
        'message' => 'Mensaje recibido correctamente. (Email no configurado)',
        'warning' => 'SMTP not configured'
    ]);
    exit;
}

// Usar PHPMailer
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';
require_once __DIR__ . '/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $mail = new PHPMailer(true);

    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASS;
    $mail->SMTPSecure = SMTP_PORT == 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;
    $mail->CharSet = 'UTF-8';

    // Remitente y destinatario
    $mail->setFrom(SMTP_USER, $name . ' - ' . $company);
    $mail->addAddress(CONTACT_RECIPIENT);
    $mail->addReplyTo($email, $name);

    // Asunto y contenido
    $subject = 'Nueva cotización de ' . $name . ' - ' . $company;
    $mail->Subject = $subject;

    // Fecha actual
    $currentDate = date('d/m/Y H:i:s');

    // Texto plano
    $textBody = "NUEVA COTIZACIÓN EXPRESS\n\n";
    $textBody .= "DATOS DEL CLIENTE:\n";
    $textBody .= "Nombre: $name\n";
    $textBody .= "Empresa: $company\n";
    $textBody .= "Email: $email\n";
    $textBody .= "Teléfono: $phone\n\n";

    $textBody .= "DETALLES DEL PRODUCTO:\n";
    $textBody .= "Tipo de producto: " . ($details['productType'] ?? 'No especificado') . "\n";
    $textBody .= "Producto: " . ($details['product'] ?? 'No especificado') . "\n";
    $textBody .= "Material: " . ($details['material'] ?? 'No especificado') . "\n";
    $textBody .= "Medidas: " . ($details['width'] ?? '') . "cm x " . ($details['height'] ?? '') . "cm\n";
    $textBody .= "Cantidad: " . ($details['quantity'] ?? 1) . "\n";

    if (!empty($details['fileName'])) {
        $textBody .= "📎 Archivo adjunto: " . $details['fileName'] . "\n";
    }
    if (!empty($details['fileNote'])) {
        $textBody .= "⚠️ NOTA: " . $details['fileNote'] . "\n";
    }

    $textBody .= "Fecha de entrega: " . ($details['deliveryDate'] ?? 'No especificada') . "\n\n";

    if (!empty($message)) {
        $textBody .= "Mensaje:\n$message\n\n";
    }
    if (!empty($details['comments'])) {
        $textBody .= "Comentarios adicionales:\n" . $details['comments'] . "\n\n";
    }

    $textBody .= "──────────────────────────────────────\n";
    $textBody .= "Enviado desde el formulario web\n";
    $textBody .= "Fecha: $currentDate\n";

    $mail->Body = $textBody;

    // HTML body
    $htmlBody = "<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #25D366; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; }
    .section { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #25D366; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; margin-bottom: 10px; }
    .file-warning { background-color: #fff3cd; border: 1px solid #ffc107; padding: 10px; border-radius: 5px; margin: 10px 0; }
    .footer { text-align: center; color: #777; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h2 style='margin: 0;'>✉️ $subject</h2>
    </div>

    <div class='content'>
      <div class='section'>
        <h3 style='color: #25D366; margin-top: 0;'>👤 Datos del Cliente</h3>
        <div class='value'><span class='label'>Nombre:</span> $name</div>
        <div class='value'><span class='label'>Empresa:</span> $company</div>
        <div class='value'><span class='label'>Email:</span> <a href='mailto:$email'>$email</a></div>
        <div class='value'><span class='label'>Teléfono:</span> <a href='tel:$phone'>$phone</a></div>
      </div>

      <div class='section'>
        <h3 style='color: #25D366; margin-top: 0;'>📦 Detalles del Producto</h3>
        <div class='value'><span class='label'>Tipo de producto:</span> " . ($details['productType'] ?? 'No especificado') . "</div>
        <div class='value'><span class='label'>Producto:</span> " . ($details['product'] ?? 'No especificado') . "</div>
        <div class='value'><span class='label'>Material:</span> " . ($details['material'] ?? 'No especificado') . "</div>
        <div class='value'><span class='label'>Medidas:</span> " . ($details['width'] ?? '') . "cm x " . ($details['height'] ?? '') . "cm</div>
        <div class='value'><span class='label'>Cantidad:</span> " . ($details['quantity'] ?? 1) . " unidades</div>
        <div class='value'><span class='label'>Fecha de entrega:</span> " . ($details['deliveryDate'] ?? 'No especificada') . "</div>";

    if (!empty($details['fileName'])) {
        $fileSize = !empty($details['fileSize']) ? round($details['fileSize'] / 1024 / 1024, 2) . 'MB' : '';
        $htmlBody .= "<div class='value' style='background-color: #e8f5e9; padding: 10px; border-radius: 5px;'>
          <span class='label'>📎 Archivo adjunto:</span> " . $details['fileName'] . " $fileSize
        </div>";
    }

    if (!empty($details['fileNote'])) {
        $htmlBody .= "<div class='file-warning'>
          <strong>⚠️ Nota sobre el archivo:</strong><br>
          " . $details['fileNote'] . "
        </div>";
    }

    $htmlBody .= "</div>";

    if (!empty($message) || !empty($details['comments'])) {
        $htmlBody .= "<div class='section'>
          <h3 style='color: #25D366; margin-top: 0;'>💬 Mensajes</h3>";

        if (!empty($message)) {
            $htmlBody .= "<div class='value'><span class='label'>Mensaje principal:</span><br>
              <div style='background-color: #f5f5f5; padding: 10px; border-radius: 5px; white-space: pre-line;'>$message</div>
            </div>";
        }

        if (!empty($details['comments'])) {
            $htmlBody .= "<div class='value'><span class='label'>Comentarios adicionales:</span><br>
              <div style='background-color: #f5f5f5; padding: 10px; border-radius: 5px; white-space: pre-line;'>" . $details['comments'] . "</div>
            </div>";
        }

        $htmlBody .= "</div>";
    }

    $htmlBody .= "<div class='footer'>
        <p>Enviado desde el formulario web de cotización EXPRESS</p>
        <p>$currentDate</p>
      </div>
    </div>
  </div>
</body>
</html>";

    $mail->isHTML(true);
    $mail->AltBody = $textBody;
    $mail->Body = $htmlBody;

    // Adjuntar archivo si existe
    if (!empty($details['fileData']) && !empty($details['fileName'])) {
        try {
            error_log("📎 Procesando archivo adjunto...");

            // Extraer base64
            if (preg_match('/^data:([^;]+);base64,(.+)$/', $details['fileData'], $matches)) {
                $mimeType = $matches[1];
                $base64Data = $matches[2];
                $fileData = base64_decode($base64Data);

                if ($fileData !== false) {
                    $mail->addStringAttachment($fileData, $details['fileName'], 'base64', $mimeType);
                    error_log("✅ Archivo adjunto preparado: " . $details['fileName']);
                }
            }
        } catch (Exception $e) {
            error_log("❌ Error procesando archivo adjunto: " . $e->getMessage());
        }
    }

    // Enviar email
    error_log("📬 Enviando email a: " . CONTACT_RECIPIENT);
    $mail->send();

    error_log("✅ Email enviado exitosamente");

    http_response_code(200);
    echo json_encode([
        'message' => 'Correo enviado correctamente.',
        'hasAttachment' => !empty($details['fileData'])
    ]);

} catch (Exception $e) {
    error_log("❌ Error en send-contact: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'message' => 'Error enviando correo.',
        'error' => $e->getMessage()
    ]);
}
?>
