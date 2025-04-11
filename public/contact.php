<?php

// configure
$from = 'Demo contact form <demo@domain.com>';
$sendTo = 'Test contact form <agutierrezwong@gmail.com>'; // Add Your Email
$subject = 'New message from contact form';
$fields = array('name' => 'Nombre', 'subject' => 'Tema', 'email' => 'Email', 'message' => 'Mensaje'); // array variable name => Text to appear in the email
$okMessage = 'Recibimos tu mensaje con éxito. Esperamos verlo pronto!';
$errorMessage = 'There was an error while submitting the form. Please try again later';

// let's do the sending

try
{
    $emailText = "Tienes un nuevo mensaje de\n=============================\n";

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    $headers = array('Content-Type: text/plain; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
    );
    
    mail($sendTo, $subject, $emailText, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
else {
    echo $responseArray['message'];
}
