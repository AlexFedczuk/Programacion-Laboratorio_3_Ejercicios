<?php
require "./Classes/Venta.php";
require "./Classes/DataBase.php";

$config = require "./db/config.php";

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Leer el cuerpo de la solicitud DELETE
    parse_str(file_get_contents("php://input"), $_DELETE);
    $numeroPedido = isset($_DELETE['numero_pedido']) ? $_DELETE['numero_pedido'] : null;

    if (empty($numeroPedido)) {
        echo "ERROR: Faltan datos obligatorios.\n";
        exit;
    }

    $db = Database::getDB($config);

    Venta::borrarVenta($db, $numeroPedido);

    Database::closeConnection($db);
} else {
    echo "ERROR: Método no permitido.\n";
}