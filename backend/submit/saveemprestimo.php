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

if (isset($post['leitor']) && isset($post['livro']) && isset($post['datee']) && isset($post['dated'])) {
    $livro = addslashes($post['livro']);
    $leitor = addslashes($post['leitor']);
    $datae = addslashes(date("Y-m-d",strtotime($post['datee'])));
    $datad = addslashes(date("Y-m-d",strtotime($post['dated'])));

    $bd = new Database();
    $query = $bd->query("INSERT INTO `emprestimos`(`id_biblioteca`, `id_livro`, `id_leitor`, `id_usuario`, `dataemprestimo`,`datadevolucao`,`concluido`) VALUES (".$_SESSION['idbiblioteca'].", $livro, $leitor,".$_SESSION['iduser'].", '$datae','$datad',0)");

    if ($query == true) {
        echo json_encode('true');
        return;
    } else {
        echo json_encode('false');
        return;
    }
}

?>


