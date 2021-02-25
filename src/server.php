<?php
        $to = 'alex.none.94@mail.ru';
        $subject = "Заполнена контактная форма на сайте ";
        $headers = "From: webmaster@gmail.com" . "\r\n" . "CC: somebodyelse@gmail.com";

        if(isset($_POST['text'])) {
                $name = $_POST["name"];
                $phone = $_POST["phone"];
                $ordMsg = $_POST["text"];
                $message = "Имя пользователя: ".$name."\nТелефон пользователя ".$phone."\nOставил сообщение: ".$ordMsg;
                        
                mail($to, $subject, $message, $headers);
        }      
?>