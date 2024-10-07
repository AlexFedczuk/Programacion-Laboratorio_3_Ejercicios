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

    public static function getDB($config){
        $database = new Database($config);
        return $database->getConnection();
    }    

    public static function closeConnection($db, $stmt = null) {
        if ($stmt) {
            $stmt->close();
        }
        $db->close();
    }

    public static function Insertar($db, $query, $params = [], $types = "") {
        $stmt = $db->prepare($query);

        if ($params) {
            $stmt->bind_param($types, ...$params);
        }

        $resultado = $stmt->execute();
        return $resultado ? true : $stmt->error;
    }

    public static function Actualizar($db, $query, $params = [], $types = "") {
        $stmt = $db->prepare($query);
        if ($params) {
            $stmt->bind_param($types, ...$params);
        }
        $resultado = $stmt->execute();
        return $resultado ? true : $stmt->error;
    }

    public static function Consultar($db, $query, $params = [], $types = "") {
        $stmt = $db->prepare($query);
        
        if ($params) {
            $stmt->bind_param($types, ...$params);  // Vincular los parámetros dinámicamente
        }
        
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        return $result;
    }

    // Método para mostrar los resultados de forma dinámica
    public static function MostrarResultados($result, $mensajeNoEncontrado, $callback) {
        if (count($result) > 0) {
            foreach ($result as $item) {
                $callback($item);  // Usar una función de callback para mostrar los resultados
            }
        } else {
            echo $mensajeNoEncontrado . "\n";
        }
    }
}