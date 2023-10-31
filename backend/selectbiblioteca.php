<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000"); // Substitua pelo URL correto do seu frontend
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

include_once 'class/connection.php';

if(!isset($_SESSION['user'])){
    die();
}

$post = json_decode(file_get_contents("php://input"), true);

if (isset($post['num'])) {
    $numbiblioteca = addslashes($post['num']);

    $bd = new Database();
    $query = $bd->query("SELECT `id`, `id_usuario`, `nome` FROM `bibliotecas` WHERE `id` = ".$numbiblioteca);

    if ($query->num_rows > 0) {
        $row = $query->fetch_assoc();
        $_SESSION['idbiblioteca'] = $row['id'];
        $_SESSION['nomebiblioteca'] = $row['nome'];
        echo json_encode(true);
        return;
    } else {
        echo json_encode(false);
        return;
    }
}