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

    public static function closeConnection($db, $stmt) {
        $stmt->close();
        $db->close();
    } 

    public static function ConsultarVentasPorDia($db, string $fecha) {
        $stmt = $db->prepare("SELECT COUNT(*) as total FROM ventas WHERE DATE(fecha) = ?");
        $stmt->bind_param("s", $fecha);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        echo "RESPUESTA DE CONSULTA: Cantidad de ventas en el dia $fecha: " . $result['total'] . "\n";
        Database::closeConnection($db, $stmt);
    }

    public static function ConsultarVentasPorUsuario($db, $email) {
        $stmt = $db->prepare("SELECT * FROM ventas WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        
        if (count($result) > 0) {
            foreach ($result as $venta) {
                echo "RESPUESTA DE CONSULTA: Venta - Pedido: " . $venta['numero_pedido'] . ", Fecha: " . $venta['fecha'] . ", Sabor: " . $venta['sabor'] . ", Tipo: " . $venta['tipo'] . ", Cantidad: " . $venta['cantidad'] . "\n";
            }
        } else {
            echo "RESPUESTA DE CONSULTA: No se encontraron ventas para el usuario $email.\n";
        }
        Database::closeConnection($db, $stmt);
    }

    public static function ConsultarVentasEntreFechas($db, $fechaInicio, $fechaFin) {
        $stmt = $db->prepare("SELECT * FROM ventas WHERE fecha BETWEEN ? AND ? ORDER BY email");
        $stmt->bind_param("ss", $fechaInicio, $fechaFin);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        
        if (count($result) > 0) {
            foreach ($result as $venta) {
                echo "RESPUESTA DE CONSULTA: Venta - Pedido: " . $venta['numero_pedido'] . ", Fecha: " . $venta['fecha'] . ", Sabor: " . $venta['sabor'] . ", Tipo: " . $venta['tipo'] . ", Cantidad: " . $venta['cantidad'] . "\n";
            }
        } else {
            echo "RESPUESTA DE CONSULTA: No se encontraron ventas entre las fechas $fechaInicio y $fechaFin.\n";
        }
        Database::closeConnection($db, $stmt);
    }

    public static function ConsultarVentasPorSabor($db, $sabor) {
        $stmt = $db->prepare("SELECT * FROM ventas WHERE sabor = ?");
        $stmt->bind_param("s", $sabor);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        
        if (count($result) > 0) {
            foreach ($result as $venta) {
                echo "RESPUESTA DE CONSULTA: Venta - Pedido: " . $venta['numero_pedido'] . ", Fecha: " . $venta['fecha'] . ", Tipo: " . $venta['tipo'] . ", Cantidad: " . $venta['cantidad'] . "\n";
            }
        } else {
            echo "RESPUESTA DE CONSULTA: No se encontraron ventas para el sabor $sabor.\n";
        }
        Database::closeConnection($db, $stmt);
    }

    public static function ConsultarVentasPorVasoCucurucho($db) {
        $stmt = $db->prepare("SELECT * FROM ventas WHERE tipo = 'Cucurucho'");
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        
        if (count($result) > 0) {
            foreach ($result as $venta) {
                echo "RESPUESTA DE CONSULTA: Venta - Pedido: " . $venta['numero_pedido'] . ", Fecha: " . $venta['fecha'] . ", Sabor: " . $venta['sabor'] . ", Cantidad: " . $venta['cantidad'] . "\n";
            }
        } else {
            echo "RESPUESTA DE CONSULTA: No se encontraron ventas con vaso Cucurucho.\n";
        }
        Database::closeConnection($db, $stmt);
    }
}