<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000"); // Substitua pelo URL correto do seu frontend
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-type: text/html; charset=utf-8");

include_once 'class/connection.php';

if(!isset($_SESSION['user']) && !isset($_SESSION['idbiblioteca'])){
    die();
}

if(isset($_GET['select'])){
    if(isset($_GET['num'])){
        $id = $_GET['num'];
    }

    $bd = new Database();

    if($_GET['select'] == 'biblioteca'){
        $query = $bd->query("SELECT bibliotecas.id,bibliotecas.nome AS nomebiblioteca,usuarios.nome AS nomeusuario 
        FROM `bibliotecas`
        INNER JOIN `usuarios` ON usuarios.id = bibliotecas.id_usuario
        WHERE bibliotecas.id_usuario = {$_SESSION['iduser']}
        UNION
        SELECT bibliotecas.id,bibliotecas.nome, usuarios.nome
        FROM convidadosbiblioteca
        INNER JOIN bibliotecas ON bibliotecas.id = id_biblioteca
        INNER JOIN usuarios ON usuarios.id = bibliotecas.id_usuario
        WHERE convidadosbiblioteca.id_usuario = {$_SESSION['iduser']} and convidadosbiblioteca.confirmado = 1;");
    
        if ($query->num_rows > 0) {
            $array = array();
            for ($i = 0; $i < $query->num_rows; $i++) {
                $row = $query->fetch_assoc();
                $array[] = array(
                    'id' => $row['id'],
                    'nomebiblioteca' => $row['nomebiblioteca'],
                    'nomeusuario' => $row['nomeusuario'],
                ) ;
            }

            echo json_encode($array);
            return;
        } else {
            echo json_encode(false);
            return;
        }    
    }

    if($_GET['select'] == 'nomelivro'){

        if(!$id){
            die();
        }

        $query = $bd->query("SELECT `id`,`nome` FROM `livros` WHERE `id` = {$id}");
        if ($query->num_rows > 0) {
            $row = $query->fetch_assoc();
            $array = array('id' => $row['id'],'nome' => $row['nome']);
            echo json_encode($array);
            return;
        }else{
            echo json_encode(false);
            return;    
        }
    }

    if($_GET['select'] == 'livrodetalhes'){
        $query = $bd->query("SELECT DISTINCT livros.id,livros.nome, livros.autor, livros.sinopse, livros.imagemcapa, leitores.nome leitornome, emprestimos.dataemprestimo,emprestimos.datadevolucao
        FROM `livros`
        LEFT JOIN `emprestimos` ON emprestimos.id_livro = livros.id
        LEFT JOIN `leitores` ON leitores.id = emprestimos.id_leitor
        WHERE livros.id =  {$id}");

        if ($query->num_rows > 0) {
            $row = $query->fetch_assoc();
            $array = array('id' => $row['id'],'nome' => $row['nome'], 'autor' => $row['autor'], 'sinopse' => $row['sinopse'], 'imagemcapa' => $row['imagemcapa'],'leitornome' => $row['leitornome'],'dataemprestimo'=>$row['dataemprestimo'],'datadevolucao'=>$row['datadevolucao']);
            echo json_encode($array);
            return;
        } else {
            echo json_encode(false);
            return;
        }
    }

    if($_GET['select'] == 'livros'){
        $query = $bd->query("SELECT DISTINCT livros.id,livros.nome, livros.autor, livros.imagemcapa,
        CASE 
            WHEN livrosemprestados.concluido = 1 || livrosemprestados.concluido IS NULL THEN 0
            WHEN livrosemprestados.concluido = 0 THEN 1
            ELSE 0
         END AS emprestimo
         FROM `livros`
        LEFT JOIN `emprestimos` livrosemprestados ON livrosemprestados.id_livro = livros.id
        WHERE livros.id_biblioteca = ".$_SESSION['idbiblioteca']);

        if ($query->num_rows > 0) {
            $array = array();
            for ($i = 0; $i < $query->num_rows; $i++) {
                $row = $query->fetch_assoc();
                $array[] = array(
                    'id' => $row['id'],
                    'nome' => $row['nome'],
                    'autor' => $row['autor'],
                    'imagemcapa' => $row['imagemcapa'],
                    'emprestimo' => $row['emprestimo'],
                );
            }
            echo json_encode($array);
            return;
        } else {
            echo json_encode(false);
            return;
        }
    }

    if($_GET['select'] == 'leitores'){
        $query = $bd->query("SELECT `id`, `nome`, `cpf`, `email`, `datanasc` FROM `leitores` WHERE `id_biblioteca` = ".$_SESSION['idbiblioteca']);

        if ($query->num_rows > 0) {
            $array = array();
            for ($i = 0; $i < $query->num_rows; $i++) {
                $row = $query->fetch_assoc();
                $array[] = array(
                    'id' => $row['id'],
                    'nome' => $row['nome'],
                    'cpf' => $row['cpf'],
                    'email' => $row['email'],
                    'datanasc' => $row['datanasc']
                ) ;
            }
            echo json_encode($array);
            return;
        } else {
            echo json_encode(false);
            return;
        }
    }

    if($_GET['select'] == 'emprestimos'){

        $query = $bd->query("SELECT emprestimos.id, `id_livro`, `id_leitor`, `id_usuario`, livros.nome livronome, leitores.nome leitornome, usuarios.nome usuarionome, `dataemprestimo`, `datadevolucao`,
        CASE 
           WHEN `concluido` = 1 THEN 'Sim'
           ELSE 'Não'
       END AS concluidosn
       FROM `emprestimos`
       INNER JOIN livros on livros.id = `id_livro`
       INNER JOIN leitores on leitores.id = `id_leitor`
       INNER JOIN usuarios on usuarios.id = `id_usuario`
       WHERE emprestimos.id_biblioteca = ".$_SESSION['idbiblioteca']);

        if($query->num_rows > 0){
            $array = array();
            for($i = 0; $i < $query->num_rows; $i++){
                $row = $query->fetch_assoc();
                
                $array[] = array(
                    'id' => $row['id'],
                    'idlivro' => $row['id_livro'],
                    'idleitor' => $row['id_leitor'],
                    'idusuario' => $row['id_usuario'],
                    'livronome' => $row['livronome'],
                    'leitornome' => $row['leitornome'],
                    'usuarionome' => $row['usuarionome'],
                    'dataemprestimo' => $row['dataemprestimo'],
                    'datadevolucao' => $row['datadevolucao'],
                    'concluidosn' => $row['concluidosn']
                );
            }
            echo json_encode($array);
            return;
        } else{
            echo json_encode(false);
            return;
        }
    }

    if($_GET['select'] == 'listausuarios' && isset($_GET['email']) && !empty($_GET['email'])){

        $email = addslashes($_GET['email']);
        $query = $bd->query("SELECT `id`, `nome`, `email` FROM `usuarios` WHERE `email` LIKE '%{$email}%' AND `id` NOT IN (SELECT `id_usuario` FROM convidadosbiblioteca WHERE id_biblioteca = 1)");
        
        if ($query->num_rows > 0) {
            $array = array();
            for ($i = 0; $i < $query->num_rows; $i++) {
                $row = $query->fetch_assoc();
                $array[] = array(
                    'id' => $row['id'],
                    'nome' => $row['nome'],
                    'email' => $row['email'],
                );
            }
            echo json_encode($array);
            return;
        } else {
            echo json_encode(false);
            return;
        }
    }

    if($_GET['select'] == 'usuariosbiblioteca'){

        $query = $bd->query("SELECT cbiblioteca.id,usuarios.nome,usuarios.email FROM `convidadosbiblioteca` cbiblioteca INNER JOIN usuarios ON `id_usuario` = usuarios.id WHERE id_biblioteca = ".$_SESSION['idbiblioteca']." AND cbiblioteca.confirmado = 1");

        if ($query->num_rows > 0) {
            $array = array();
            for ($i = 0; $i < $query->num_rows; $i++) {
                $row = $query->fetch_assoc();
                $array[] = array(
                    'id' => $row['id'],
                    'nome' => $row['nome'],
                    'email' => $row['email'],
                );
            }
            echo json_encode($array);
            return;
        } else {
            echo json_encode(false);
            return;
        }
    }

    if($_GET['select'] == 'convites'){
        $query = $bd->query("SELECT convidadosbiblioteca.id, usuarios.nome usuarionome, bibliotecas.nome bibliotecanome, `confirmado` FROM `convidadosbiblioteca`
        INNER JOIN usuarios ON usuarios.id = id_usuario
        INNER JOIN bibliotecas ON bibliotecas.id = id_biblioteca
        WHERE `confirmado`  = 0 AND convidadosbiblioteca.id_usuario = ".$_SESSION['iduser']);
        
        if ($query->num_rows > 0) {
            $array = array();
            for ($i = 0; $i < $query->num_rows; $i++) {
                $row = $query->fetch_assoc();
                $array[] = array(
                    'id' => $row['id'],
                    'usuarionome' => $row['usuarionome'],
                    'bibliotecanome' => $row['bibliotecanome'],
                    'confirmado' => $row['confirmado']
                );
            }
            echo json_encode($array);
            return;
        } else {
            echo json_encode(false);
            return;
        }
    }

}else{
    echo json_encode(false);
    return;
}
