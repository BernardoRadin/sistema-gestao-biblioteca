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

if(isset($post['id']) && isset($post['nome']) && isset($post['cpf']) && isset($post['email']) && isset($post['datanasc'])){
    $id = addslashes($post['id']);

    $bd = new Database();
    $query = $bd->query("SELECT `id` FROM leitores WHERE `id` = {$id} AND id_biblioteca = '{$_SESSION['idbiblioteca']}'");

    if ($query->num_rows > 0) {
        $nome = addslashes($post['nome']);
        $cpf = addslashes($post['cpf']);
        $email = addslashes($post['email']);
        $datanasc = addslashes($post['datanasc']);

        $queryedit = $bd->query("UPDATE `leitores` SET `nome`='{$nome}',`cpf`='{$cpf}',`email`='{$email}',`datanasc`='{$datanasc}' WHERE id = {$id}");

        if($queryedit == true){
            echo json_encode('true');
            return;
        }else{
            echo json_encode('false');
            return;
        }
    }else{
        return false;
    }
}