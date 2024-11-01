<?php
header('Content-Type: application/json');

// Lee el archivo JSON y envía el contenido como respuesta
$data = file_get_contents(__DIR__ . '/../Registros/datos.json');

if ($data === false) {
    http_response_code(500);
    echo json_encode(["error" => "No se pudieron cargar los datos."]);
} else {
    http_response_code(200);
    echo $data;
}