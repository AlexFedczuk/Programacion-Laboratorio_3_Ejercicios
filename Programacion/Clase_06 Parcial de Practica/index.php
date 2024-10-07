<?php
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        require 'ConsultasVentas.php';
        break;
    case 'POST':
        $action = isset($_POST['action']) && !empty($_POST['action']) ? $_POST['action'] : null;
        switch ($action) {
            case 'altaHelado':
                require 'HeladeriaAlta.php';
                break;
            case 'consultarHelado':
                require 'HeladoConsultar.php';
                break;
            case 'altaVenta':
                require 'AltaVenta.php';
                break;
            case 'devolverHelado':
                require 'DevolverHelado.php';
            default:
                echo json_encode(['error' => 'ERROR: ACCION dentro del METODO POST no valida.']);
                break;
        }
        break;
    case 'PUT':
        require 'ModificarVenta.php';
        break;
    case 'DELETE':
        require 'BorrarVenta.php';
        break;

    default:
        echo "ERROR: No se ha ingresado un metodo valido.";
        break;
}