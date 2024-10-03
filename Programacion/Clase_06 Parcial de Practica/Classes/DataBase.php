<?php
class Database {
    private $host;
    private $db_name;
    private $username; //El 'root', cambia si usas otro usuario
    private $password;
    public $conn;

    public function __construct(array $config){
        $this->host = $config['host'];
        $this->db_name = $config['db_name'];
        $this->username = $config['username'];
        $this->password = $config['password'];
    }

    public function getConnection() {
        $this->conn = null;
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);

        if ($this->conn->connect_error) {
            die("Error de conexion: " . $this->conn->connect_error);
        }

        return $this->conn;
    }
}