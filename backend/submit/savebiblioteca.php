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

$post = json_decode(file_get_contents("php://input"),true);
if(isset($post['name'])){
    $name = addslashes($post['name']);

    $bd = new Database();
    $query = $bd->query("INSERT INTO `bibliotecas`(`id_usuario`,`nome`) VALUES ('".$_SESSION['iduser']."','$name')");
    if ($query == true) {
        echo json_encode('true');
        return;
    } else {
        echo json_encode('false');
        return;
    }
}