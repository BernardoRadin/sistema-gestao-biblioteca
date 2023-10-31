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

if(isset($post['id']) && isset($post['deletar'])){
    $id = addslashes($post['id']);

    $bd = new Database();

    if($post['deletar'] == 'livro'){

        $query = $bd->query("SELECT `id` FROM livros WHERE `id` = {$id} AND id_biblioteca = '{$_SESSION['idbiblioteca']}'");

        if ($query->num_rows > 0) {

            $query = $bd->query("DELETE FROM `livros` WHERE `id` = {$id}");

            if($query == true){
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

    if($post['deletar'] == 'emprestimo'){

        $query = $bd->query("SELECT `id` FROM emprestimos WHERE `id` = {$id} AND id_biblioteca = '{$_SESSION['idbiblioteca']}'");

        if ($query->num_rows > 0) {

            $query = $bd->query("DELETE FROM `emprestimos` WHERE `id` = {$id}");

            if($query == true){
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

    
    if($post['deletar'] == 'leitor'){

        $query = $bd->query("SELECT `id` FROM leitores WHERE `id` = {$id} AND id_biblioteca = '{$_SESSION['idbiblioteca']}'");

        if ($query->num_rows > 0) {

            $query = $bd->query("DELETE FROM `leitores` WHERE `id` = {$id}");

            if($query == true){
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
}