<?php

class Database
{
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'sistemabiblioteca';
    public $connection;

    public function __construct(){
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->connection->connect_error) {
            die(json_encode(false));
        }
    }

    public function query($sql)
    {
        $result = $this->connection->query($sql);
        return $result;
    }

}
