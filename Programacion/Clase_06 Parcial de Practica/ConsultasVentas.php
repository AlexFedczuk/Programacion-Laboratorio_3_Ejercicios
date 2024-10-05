<?php
require "./Classes/DataBase.php";
$config = require "./db/config.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $accion = isset($_GET['accion']) ? $_GET['accion'] : null;


    $database = new Database($config);
    $db = $database->getConnection();

    if(!$db){
        echo "ERROR: No se ha podido realizar la conexion con la base de datos.\n";
        exit;
    }

    switch ($accion) {
        case 'ventasPorDia':
            $fecha = isset($_GET['fecha']) ? $_GET['fecha'] : date('Y-m-d', strtotime('yesterday'));
            Database::ConsultarVentasPorDia($db, $fecha);
            break;

        case 'ventasPorUsuario':
            $email = isset($_GET['email']) ? $_GET['email'] : null;
            if ($email) {
                Database::ConsultarVentasPorUsuario($db, $email);
            } else {
                echo "ERROR: Email no proporcionado.\n";
            }
            break;

        case 'ventasEntreFechas':
            $fechaInicio = isset($_GET['fechaInicio']) ? $_GET['fechaInicio'] : null;
            $fechaFin = isset($_GET['fechaFin']) ? $_GET['fechaFin'] : null;
            if ($fechaInicio && $fechaFin) {
                Database::ConsultarVentasEntreFechas($db, $fechaInicio, $fechaFin);
            } else {
                echo "ERROR: Fechas no proporcionadas.\n";
            }
            break;

        case 'ventasPorSabor':
            $sabor = isset($_GET['sabor']) ? $_GET['sabor'] : null;
            if ($sabor) {
                Database::ConsultarVentasPorSabor($db, $sabor);
            } else {
                echo "ERROR: Sabor no proporcionado.\n";
            }
            break;

        case 'ventasPorVasoCucurucho':
            Database::ConsultarVentasPorVasoCucurucho($db);
            break;

        default:
            echo "ERROR: Accion no valida.\n";
            break;
    }
} else {
    echo "ERROR: Metodo no permitido.\n";
}





