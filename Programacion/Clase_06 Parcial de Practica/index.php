<?php
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        echo "Has enviado una peticion con el metodo GET. En desarrollo...";
        break;
    case 'POST':
        // Obtengo el valor de 'action' para determinar qué operación se desea realizar.
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
            default:
                echo json_encode(['error' => 'ERROR: ACCION dentro del METODO POST no valida.']);
                break;
        }
        break;
    case 'PUT':
        echo "Has enviado una peticion con el metodo PUT. En desarrollo...";
        break;
    case 'DELETE':
        echo "Has enviado una peticion con el metodo DELETE. En desarrollo...";
        break;

    default:
        echo "ERROR: No se ha ingresado un metodo valido.";
        break;
}