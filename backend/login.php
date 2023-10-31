<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

include_once 'class/connection.php';

$post = json_decode(file_get_contents("php://input"), true);

if (isset($post['user']) && isset($post['password'])) {
    $user = addslashes($post['user']);
    $password = md5(addslashes($post['password']));
    
    $bd = new Database();
    $query = $bd->query("SELECT `id` FROM `usuarios` WHERE `nome` = '{$user}' AND `senha` = '{$password}'");

    if ($query->num_rows > 0) {
        $row = $query->fetch_assoc();
        $_SESSION['iduser'] = $row['id'];
        $_SESSION['user'] = $user;
        echo json_encode(true);
        return;
    } else {
        echo json_encode(false);
        return;
    }
}

?>


