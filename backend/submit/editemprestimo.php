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

if(isset($post['id']) && isset($post['dataemprestimo']) && isset($post['datadevolucao']) && isset($post['concluido'])){
    $id = addslashes($post['id']);

    $bd = new Database();
    $query = $bd->query("SELECT `id` FROM emprestimos WHERE `id` = {$id} AND id_biblioteca = '{$_SESSION['idbiblioteca']}'");

    if ($query->num_rows > 0) {
        $dataemprestimo = addslashes($post['dataemprestimo']);
        $datadevolucao = addslashes($post['datadevolucao']);
        $concluido = addslashes($post['concluido']);

        $queryedit = $bd->query("UPDATE `emprestimos` SET `dataemprestimo`='{$dataemprestimo}',`datadevolucao`='{$datadevolucao}',`concluido`='{$concluido}' WHERE id = {$id}");

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