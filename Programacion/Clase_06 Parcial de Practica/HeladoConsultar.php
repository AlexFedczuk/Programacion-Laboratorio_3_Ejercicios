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
        $data = json_decode(file_get_contents($jsonFile), true);
    } else {
        echo json_encode(['error' => 'ERROR: No se encontro el archivo de datos']);
        exit;
    }

    // Variables para detectar coincidencias
    $saborEncontrado = false;
    $tipoEncontrado = false;

    // Buscar coincidencias en los datos
    foreach ($data as $helado) {
        if ($helado['sabor'] == $sabor) {
            $saborEncontrado = true;
            if ($helado['tipo'] == $tipo) {
                // Si coinciden el sabor y el tipo, retornamos "existe"
                // $tipoEncontrado = true; Lo comento porque termina siendo redundante, ya que si existe, no va a ser necesario cambiar el estado de la variable.
                echo json_encode(['message' => 'existe']);
                exit;
            }
        }
    }

    // Si no encontramos el sabor y tipo juntos, informamos el resultado
    if (!$saborEncontrado) {
        echo json_encode(['message' => 'El sabor no existe']);
    } elseif ($saborEncontrado && !$tipoEncontrado) {
        echo json_encode(['message' => 'El tipo no coincide con el sabor']);
    }
} else {
    echo json_encode(['error' => 'ERROR: Metodo no permitido']);
}