<?php
session_start();

header("access-control-allow-origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

if(!isset($_SESSION['user']) && !isset($_SESSION['idbiblioteca'])){
    die('');
}

include_once '../class/connection.php';

$post = json_decode(file_get_contents("php://input"), true);

if (isset($post['name']) && isset($post['cpf']) && isset($post['email']) && isset($post['date'])) {
    $name = addslashes($post['name']);
    $cpf = addslashes($post['cpf']);
    $email = addslashes($post['email']);
    $date = addslashes($post['date']);

    $bd = new Database();
    $query = $bd->query("INSERT INTO `leitores`(`id_biblioteca`, `nome`, `cpf`, `email`, `datanasc`) VALUES (".$_SESSION['idbiblioteca'].", '$name', '$cpf','$email', '$date')");

    if ($query == true) {
        echo json_encode('true');
        return;
    } else {
        echo json_encode('false');
        return;
    }
}

?>


