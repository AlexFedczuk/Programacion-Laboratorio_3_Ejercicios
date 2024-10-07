<?php
require "./Classes/DataBase.php";
require "./Classes/Archivo.php";

$config = require "./db/config.php";
$devolucionesFile = "./Registros/devoluciones.json";
$cuponesFile = "./Registros/cupones.json";
$imageDir = "./ImagenesDeDevoluciones/2024/";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $numeroPedido = isset($_POST['numero_pedido']) ? $_POST['numero_pedido'] : null;
    $causa = isset($_POST['causa']) ? $_POST['causa'] : null;
    $imagen = isset($_FILES['imagen']) ? $_FILES['imagen'] : null;

    if (empty($numeroPedido) || empty($causa) || empty($imagen)) {
        echo "ERROR: Faltan datos obligatorios.\n";
        exit;
    }

    $db = Database::getDB($config);

    // Verificar si el número de pedido existe
    $queryVerificar = "SELECT * FROM ventas WHERE numero_pedido = ?";
    $result = DataBase::Consultar($db, $queryVerificar, [$numeroPedido], "i");

    if (count($result) > 0) {
        // Si el pedido existe, realizamos la actualización
        $queryActualizar = "UPDATE ventas SET email = ?, sabor = ?, tipo = ?, cantidad = ?, vaso = ? WHERE numero_pedido = ?";
        $paramsActualizar = [$email, $sabor, $tipo, $cantidad, $vaso, $numeroPedido];
    
        $resultado = DataBase::Actualizar($db, $queryActualizar, $paramsActualizar, "sssisi");
    
        if ($resultado === true) {
            // Verificar y actualizar el archivo JSON (stock)
            $result = Venta::VerificarPosibleVenta($lista_helados, new Venta($email, $sabor, $tipo, $vaso, $cantidad));
            if (file_put_contents($jsonFile, json_encode($result[2], JSON_PRETTY_PRINT))) {
                echo "VENTA MODIFICADA: El pedido numero $numeroPedido ha sido modificado correctamente.\n";
            } else {
                echo "ERROR: No se pudo actualizar el archivo JSON.\n";
            }
        } else {
            echo "ERROR: No se pudo modificar el pedido en la base de datos. Detalle: $resultado\n";
        }
    } else {
        echo "ERROR: No existe un pedido con el número $numeroPedido.\n";
    }

    Database::closeConnection($db, $stmt);
} else {
    echo "ERROR: Método no permitido.\n";
}