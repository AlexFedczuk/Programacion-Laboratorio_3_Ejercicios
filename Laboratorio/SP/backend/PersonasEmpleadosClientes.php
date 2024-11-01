<?php
header('Content-Type: application/json');

// Ruta al archivo JSON
$jsonFile = '../Registros/datos.json';

if (!file_exists($jsonFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'El archivo JSON no se encuentra en la ubicación especificada.']);
    exit;
}

// Leer el archivo JSON existente
$data = file_get_contents($jsonFile);
$personas = json_decode($data, true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Enviar la lista de personas como respuesta en JSON
        echo json_encode($personas);
        http_response_code(200);
        break;

    case 'POST':
        echo json_encode(['warning' => 'AVISO: En desarollo...']);
        break;

    case 'PUT':
        // Leer el contenido de la solicitud PUT
        $inputData = json_decode(file_get_contents("php://input"), true);
        
        if (!$inputData) {
            http_response_code(400);
            echo json_encode(['error' => 'Error: Datos inválidos']);
            exit;
        }

        // Generar un nuevo ID único
        $newId = count($personas) > 0 ? max(array_column($personas, 'id')) + 1 : 1;
        $inputData['id'] = $newId;

        // Agregar la nueva persona a la lista
        $personas[] = $inputData;

        // Guardar la lista actualizada en el archivo JSON
        if (file_put_contents($jsonFile, json_encode($personas, JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(['id' => $newId]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo guardar el archivo JSON']);
        }
        break;

    case 'DELETE':
        echo json_encode(['warning' => 'AVISO: En desarollo...']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}