<?php
require "./Classes/Archivo.php";
require "./Classes/Helado.php";

$jsonFile = "./Registros/heladeria.json";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sabor = $_POST['sabor'];
    $tipo = $_POST['tipo'];

    if (empty($sabor) || empty($tipo)) {
        echo "ERROR: Sabor y tipo son requeridos en el body.\n";
        exit;
    }
    $lista_helados = Archivo::DescargarArrayJSON($jsonFile);

    Helado::VerificarExistenciaSaborYTipo($lista_helados, $sabor, $tipo);
} else {
    echo "ERROR: Sabor y tipo son requeridos en el body.\n";
}