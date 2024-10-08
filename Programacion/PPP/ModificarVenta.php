<?php
require "./Clases/Venta.php";

$ventasFile = "./Registros/ventas.json";

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents("php://input"), $_PUT);

    $numeroPedido = isset($_PUT['numero_pedido']) ? $_PUT['numero_pedido'] : null;
    $email = isset($_PUT['email']) ? $_PUT['email'] : null;
    $titulo = isset($_PUT['titulo']) ? $_PUT['titulo'] : null;
    $tipo = isset($_PUT['tipo']) ? $_PUT['tipo'] : null;
    $formato = isset($_PUT['formato']) ? $_PUT['formato'] : null;
    $cantidad = isset($_PUT['cantidad']) ? $_PUT['cantidad'] : null;

    if (empty($numeroPedido) || empty($email) || empty($titulo) || empty($tipo) || empty($formato) || empty($cantidad)) {
        echo "ERROR: Faltan datos obligatorios.\n";
        exit;
    }

    $lista_ventas = Archivo::DescargarArrayJSON($ventasFile);

    if ($lista_ventas == []) {
        echo "ERROR: No se encontraron ventas en el archivo.\n";
        exit;
    }

    $ventaModificada = Venta::modificarVenta($numeroPedido, $email, $titulo, $tipo, $formato, $cantidad, $lista_ventas);

    if ($ventaEncontrada) {
        if (Archivo::CargarArrayJSON($ventasFile, $lista_ventas)) {
            echo "SUCCESS: Venta modificada exitosamente.\n";
        } else {
            echo "ERROR: No se pudo guardar la modificación en el archivo.\n";
        }
    } else {
        echo "ERROR: No existe una venta con el número de pedido $numeroPedido.\n";
    }
} else {
    echo "ERROR: Metodo no permitido.\n";
}