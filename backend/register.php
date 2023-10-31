<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

include_once 'class/connection.php';

$post = json_decode(file_get_contents("php://input"), true);

if (isset($post['user']) && isset($post['password']) && isset($post['email'])) {
    $user = addslashes($post['user']);
    $password = md5(addslashes($post['password']));
    $email = addslashes($post['email']);
    
    $bd = new Database();
    $query = $bd->query("INSERT INTO `usuarios`(`nome`,`email`,`senha`) VALUES ('$user', '$email', '$password')");

    if ($query == true) {
        echo json_encode(true);
        return;
    } else {
        echo json_encode(false);
        return;
    }
}

?>


