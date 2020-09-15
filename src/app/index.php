<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
require 'vendor/autoload.php';
require  'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';
var_dump('$_REQUEST');
// Создаем письмо
if (isset($_POST['submit'])) {
    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();                   // Отправка через SMTP
    $mail->Host   = 'smtp.mailtrap.io';  // Адрес SMTP сервера
    $mail->SMTPAuth   = true;          // Enable SMTP authentication
    $mail->Username   = 'afffa11a1ae811';       // ваше имя пользователя (без домена и @)
    $mail->Password   = '8725bfee51f0d1';    // ваш пароль
    $mail->SMTPSecure = 'tls';         // шифрование ssl
    $mail->Port   = 587;               // порт подключения

    $mail->setFrom('ilmir2007@inbox.ru', $_REQUEST['phone']);    // от кого
    $mail->addAddress('test@ya.ru', $_REQUEST['phone']);  // кому

    $mail->Subject = 'Тест';
    $mail->msgHTML("<html><body>
                <h1>{$_REQUEST['phone']}</h1>
                </html></body>");
// Отправляем
    if ($mail->send()) {
        echo 'Письмо отправлено!';
    } else {
        echo 'Ошибка: ' . $mail->ErrorInfo;
    }

}
?>