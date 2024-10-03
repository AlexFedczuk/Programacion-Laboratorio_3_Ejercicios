<?php
$jsonFile = 'heladeria.json';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sabor = $_POST['sabor'];
    $tipo = $_POST['tipo'];

    if (empty($sabor) || empty($tipo)) {
        echo json_encode(['error' => 'ERROR: Sabor y tipo son requeridos']);
        exit;
    }

    if (file_exists($jsonFile)) {
        $lista_helados = json_decode(file_get_contents($jsonFile), true);
    } else {
        echo json_encode(['error' => 'ERROR: No se encontro el archivo de datos']);
        exit;
    }
    Helado::VerificarExistenciaSaborYTipo($lista_helados, $sabor, $tipo);
} else {
    echo json_encode(['error' => 'ERROR: Metodo no permitido']);
}