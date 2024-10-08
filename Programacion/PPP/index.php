<?php
$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        require "ConsultasVentas.php";
        break;

    case "POST":
        $action = isset($_POST["action"]) ? $_POST["action"] : null;

        switch ($action) {
            case "altaProducto":
                require "TiendaAlta.php";
                break;

            case "consultarProducto":
                require "ProductoConsultar.php";
                break;

            case "altaVenta":
                require "AltaVenta.php";
                break;

            default:
                echo "ERROR: ACCION dentro del METODO POST no valida.\n";
                break;
        }
        break;

    case "PUT":
        require "ModificarVenta.php";
        break;

    case "DELETE":
        require "BorrarVenta.php";
        break;

    default:
        echo "ERROR: No se ha ingresado un metodo valido.";
        break;
}