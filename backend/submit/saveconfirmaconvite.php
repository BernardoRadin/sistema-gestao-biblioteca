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

if (isset($post['id']) && isset($post['confirm'])){
    $id = addslashes($post['id']);
    if($post['confirm'] == 1 || $post['confirm'] == 0){
        $confirm =$post['confirm'];
    }

    $bd = new Database();

    $queryselect = $bd->query("SELECT `id` FROM `convidadosbiblioteca` WHERE `id` = $id AND `id_usuario` = {$_SESSION['iduser']}");
    
    if($queryselect->num_rows > 0){

        if($confirm == 1){
            $query = $bd->query("UPDATE `convidadosbiblioteca` SET `confirmado`= '1' WHERE `id` = $id");
        }else{
            $query = $bd->query("DELETE FROM `convidadosbiblioteca` WHERE `id` = $id");
        }
    
        if ($query == true) {
            echo json_encode('true');
            return;
        } else {
            echo json_encode('false');
            return;
        }

    }
}

?>


