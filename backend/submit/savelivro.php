<?php
session_start();

header("access-control-allow-origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: multipart/form-data');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

if(!isset($_SESSION['user']) && !isset($_SESSION['idbiblioteca'])){
    die('');
}

include_once '../class/connection.php';


if ($_POST['name'] && $_POST['author'] && $_FILES['image']) {
    $name = addslashes($_POST['name']);
    $author = addslashes($_POST['author']);
    $sinopse = addslashes($_POST['sinopse']);
    $image = $_FILES['image'];
    $type = $image['type'];
    $path = "images/".$_SESSION['iduser'].date("mdygisu");

    if($type == 'image/jpeg'){
        $path .= '.jpeg';
    }else if($type == 'image/jpg'){
        $path .= '.jpg';
    }else if($type == 'image/png'){
        $path .= '.png';
    }else{
        echo json_encode("FormatImage");
        return;
    }

    if (!move_uploaded_file($image["tmp_name"], $path)){
        echo json_encode('false');
    }

    $bd = new Database();
    $query = $bd->query("INSERT INTO `livros`(`id_biblioteca`, `nome`, `autor`, `sinopse`, `imagemcapa`) VALUES (".$_SESSION['idbiblioteca'].", '$name', '$author', '$sinopse','$path')");

    if ($query == true) {
        echo json_encode('true');
        return;
    } else {
        echo json_encode('false');
        unlink($path);
        return;
    }
}

?>


