<?php
require "./Classes/Devolucion.php";
require "./Classes/Archivo.php";
require "./Classes/DataBase.php";

$config = require "./db/config.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $numeroPedido = isset($_POST['numero_pedido']) ? $_POST['numero_pedido'] : null;
    $causa = isset($_POST['causa']) ? $_POST['causa'] : null;
    $imagen = isset($_FILES['imagen']) ? $_FILES['imagen'] : null;

    if (empty($numeroPedido) || empty($causa) || empty($imagen)) {
        echo "ERROR: Faltan datos obligatorios.\n";
        exit;
    }

    $db = Database::getDB($config);
    $devolucion = new Devolucion($db);

    $devolucion->registrarDevolucion($numeroPedido, $causa, $imagen);

    Database::closeConnection($db);
} else {
    echo "ERROR: Método no permitido.\n";
}