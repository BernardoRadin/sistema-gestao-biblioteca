<?php
session_start();

header("access-control-allow-origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if(isset($_GET['s']) && $_GET['s'] == 'user'){
    if(isset($_SESSION['user'])){
        echo json_encode(true);
        return;
    }else{
        echo json_encode(false);
        return;
    }
}

if(isset($_GET['s']) && $_GET['s'] == 'dados'){
    if(isset($_SESSION['idbiblioteca'])){
        echo json_encode(true);
        return;
    }else{
        echo json_encode(false);
        return;
    }
}