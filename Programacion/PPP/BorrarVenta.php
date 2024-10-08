<?php
require "./Clases/Venta.php";

$ventasFile = "./Registros/ventas.json";
$backupImageDir = "./ImagenesBackupVentas/2024/";
$imageDir = "./ImagenesDeVenta/2024/";

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);

    $numeroPedido = isset($_DELETE['numero_pedido']) ? $_DELETE['numero_pedido'] : null;

    if (empty($numeroPedido)) {
        echo "ERROR: Falta el numero de pedido.\n";
        exit;
    }

    $lista_ventas = Archivo::DescargarArrayJSON($ventasFile);

    if ($lista_ventas == []) {
        echo "ERROR: No se encontraron ventas en el archivo.\n";
        exit;
    }

    $ventaBorrada = Venta::borrarVenta($numeroPedido, $lista_ventas, $imageDir, $backupImageDir);

    if ($ventaBorrada) {
        if (Archivo::CargarArrayJSON($ventasFile, $lista_ventas)) {
            echo "SUCCESS: Venta marcada como eliminada.\n";
        } else {
            echo "ERROR: No se pudo guardar la modificacin en el archivo.\n";
        }
    } else {
        echo "ERROR: No existe una venta con el numero de pedido $numeroPedido.\n";
    }
} else {
    echo "ERROR: Metodo no permitido.\n";
}