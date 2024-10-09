<?php
require "./Clases/Venta.php";

$ventasFile = "./Registros/tienda.json";
// Esto lo acabo de agregar...
$ventasNuevoFile = "./Registros/ventas.json";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $accion = isset($_GET["accion"]) ? $_GET["accion"] : null;

    $lista_ventas = Archivo::DescargarArrayJSON($ventasFile);

    if ($lista_ventas == []) {
        echo "ERROR: No se encontraron ventas en el archivo.\n";
        exit;
    }

    switch ($accion) {
        case "ventasPorDia":
            $fecha = isset($_GET["fecha"]) ? $_GET["fecha"] : date('Y-m-d', strtotime('yesterday'));
            Venta::consultarVentasPorDia($lista_ventas, $fecha);
            break;

        case "ventasPorUsuario":
            $email = isset($_GET["email"]) ? $_GET["email"] : null;
            if ($email) {
                Venta::consultarVentasPorUsuario($lista_ventas, $email);
            } else {
                echo "ERROR: Email no proporcionado.\n";
            }
            break;

        case "ventasPorTipo":
            $tipo = isset($_GET["tipo"]) ? $_GET["tipo"] : null;
            if ($tipo) {
                Venta::consultarVentasPorTipo($lista_ventas, $tipo);
            } else {
                echo "ERROR: Tipo de producto no proporcionado.\n";
            }
            break;

        case "productosPorRangoDePrecio":
            $precioMin = isset($_GET["precioMin"]) ? $_GET["precioMin"] : null;
            $precioMax = isset($_GET["precioMax"]) ? $_GET["precioMax"] : null;
            if ($precioMin && $precioMax) {
                Venta::consultarProductosPorRangoDePrecio($lista_ventas, $precioMin, $precioMax);
            } else {
                echo "ERROR: Debes proporcionar un precio minimo y un precio maximo.\n";
            }
            break;

        case "productosOrdenadosPorAnio":
            Venta::consultarProductosPorAnio($lista_ventas);
            break;

        case "productoMasVendido":
            $lista_ventas_agregada = Archivo::DescargarArrayJSON($ventasNuevoFile);
            Venta::consultarProductoMasVendido($lista_ventas_agregada);
            break;

        default:
            echo "ERROR: Accion no valida.\n";
            break;
    }
} else {
    echo "ERROR: Metodo no permitido.\n";
}