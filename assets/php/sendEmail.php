<?php
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;
$body = html_entity_decode($_GET["body"]);

$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.live.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'weaponzpkh@hotmail.com';                 // SMTP username
$mail->Password = 'heartoftart2';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to

$mail->setFrom('weaponzpkh@hotmail.com');
$mail->addAddress('ali.irfan@ryerson.ca');     // Add a recipient// Name is optional

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Bug Report Sent - RyPlanner';
$mail->Body    = $body;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}