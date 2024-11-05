<?php
header('Content-Type: application/json');

// Ruta al archivo JSON
$jsonFile = '../Registros/datos.json';
// URL de la API
$apiUrl = 'https://examenesutn.vercel.app/api/VehiculoAutoCamion';

if (!file_exists($jsonFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'El archivo JSON no se encuentra en la ubicación especificada.']);
    exit;
}

// Leer el archivo JSON existente
$data = file_get_contents($jsonFile);
$vehiculos = json_decode($data, true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        /* De LOCAL
        // Enviar la lista de vehiculos como respuesta en JSON
        echo json_encode($vehiculos);
        http_response_code(200);
        */

        // Por API
        // Obtener la lista de vehículos
        $response = file_get_contents($apiUrl);
        if ($response === FALSE) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al conectar con la API']);
            exit;
        }
        echo $response; // Devuelve la lista de vehículos
        break;

    case 'POST':
        // Leer los datos enviados en la solicitud
        $inputData = json_decode(file_get_contents('php://input'), true);
        if (!$inputData) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos inválidos']);
            exit;
        }

        /* De LOCAL:
        // Validar que se haya enviado el ID
        if (!isset($inputData['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID no proporcionado para la modificación']);
            exit;
        }

        // Buscar y actualizar el registro en la lista
        $updated = false;
        foreach ($vehiculos as &$vehiculo) {
            if ($vehiculo['id'] == $inputData['id']) {
                $vehiculo = array_merge($vehiculo, $inputData); // Actualizar datos
                $updated = true;
                break;
            }
        }

        if ($updated) {
            // Guardar los datos actualizados en el archivo JSON
            file_put_contents($jsonFile, json_encode($vehiculos, JSON_PRETTY_PRINT));
            http_response_code(200);
            echo json_encode(['success' => 'Registro modificado con éxito']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Registro no encontrado']);
        }*/
        // Enviar datos a la API para crear un nuevo vehículo
        $options = [
            'http' => [
                'header'  => "Content-Type: application/json\r\n",
                'method'  => 'POST',
                'content' => json_encode($inputData),
            ],
        ];
        $context  = stream_context_create($options);
        $result = file_get_contents($apiUrl, false, $context);
        if ($result === FALSE) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al crear el vehículo']);
            exit;
        }

        echo $result; // Devuelve la respuesta de la API
        break;

    case 'PUT':
        /*De LOCAL
        // Leer el contenido de la solicitud PUT
        $inputData = json_decode(file_get_contents("php://input"), true);
        
        if (!$inputData) {
            http_response_code(400);
            echo json_encode(['error' => 'Error: Datos inválidos']);
            exit;
        }

        // Generar un nuevo ID único
        $newId = count($vehiculos) > 0 ? max(array_column($vehiculos, 'id')) + 1 : 1;
        $inputData['id'] = $newId;

        // Agregar la nueva vehi$vehiculo a la lista
        $vehiculos[] = $inputData;

        // Guardar la lista actualizada en el archivo JSON
        if (file_put_contents($jsonFile, json_encode($vehiculos, JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(['id' => $newId]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo guardar el archivo JSON']);
        }*/
        // Leer los datos enviados en la solicitud
        $inputData = json_decode(file_get_contents('php://input'), true);
        if (!$inputData || !isset($inputData['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos inválidos o ID no proporcionado']);
            exit;
        }

        // Enviar datos a la API para modificar el vehículo
        $options = [
            'http' => [
                'header'  => "Content-Type: application/json\r\n",
                'method'  => 'PUT',
                'content' => json_encode($inputData),
            ],
        ];
        $context  = stream_context_create($options);
        $result = file_get_contents($apiUrl, false, $context);
        if ($result === FALSE) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al modificar el vehículo']);
            exit;
        }

        echo $result; // Devuelve la respuesta de la API
        break;

    case 'DELETE':
        /* De LOCAL
        $id = $_GET['id']; // Obtener el ID del query string

        // Leer el archivo JSON existente
        $data = file_get_contents($jsonFile);
        $vehiculos = json_decode($data, true);

        // Buscar el índice del elemento a eliminar
        $index = array_search($id, array_column($vehiculos, 'id'));

        if ($index !== false) {
            // Eliminar el elemento del array
            array_splice($vehiculos, $index, 1);

            // Guardar los datos actualizados en el archivo JSON
            file_put_contents($jsonFile, json_encode($vehiculos, JSON_PRETTY_PRINT));

            // Respuesta exitosa
            http_response_code(200);
            echo json_encode(['message' => 'Persona eliminada correctamente.']);
        } else {
            // Si no se encuentra el ID
            http_response_code(404);
            echo json_encode(['error' => 'Persona no encontrada.']);
        }*/
        // Leer el ID del vehículo a eliminar
        $inputData = json_decode(file_get_contents('php://input'), true);
        if (!$inputData || !isset($inputData['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID no proporcionado para la eliminación']);
            exit;
        }

        // Enviar solicitud a la API para eliminar el vehículo
        $options = [
            'http' => [
                'header'  => "Content-Type: application/json\r\n",
                'method'  => 'DELETE',
                'content' => json_encode($inputData),
            ],
        ];
        $context  = stream_context_create($options);
        $result = file_get_contents($apiUrl, false, $context);
        if ($result === FALSE) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar el vehículo']);
            exit;
        }

        echo $result; // Devuelve la respuesta de la API
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}