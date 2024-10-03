<?php

$config = require 'config.php';
$jsonFile = 'heladeria.json';
$imageDir = 'ImagenesDeLaVenta/2024/';

if (!is_dir($imageDir)) {
    mkdir($imageDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $sabor = $_POST['sabor'];
    $tipo = $_POST['tipo'];
    $vaso = $_POST['vaso'];
    $cantidadVendida = $_POST['stock']; // Cantidad del stock que el usuario quiere comprar

    if (empty($email) || empty($sabor) || empty($tipo) || empty($vaso) || empty($cantidadVendida)) {
        echo json_encode(['error' => 'ERROR: Faltan datos obligatorios o la imagen.']);
        exit;
    }

    if (file_exists($jsonFile)) {
        $data = json_decode(file_get_contents($jsonFile), true);
    } else {
        echo json_encode(['error' => 'ERROR: No se encontro el archivo de datos.']);
        exit;
    }

    // Banderas para verificar el proceso
    $heladoEncontrado = false;
    $stockSuficiente = false;
    $heladoActualizado = null;

    foreach ($data as &$helado) {
        if ($helado['sabor'] == $sabor && $helado['tipo'] == $tipo) {
            $heladoEncontrado = true;
            if ($helado['stock'] >= $cantidadVendida) {
                $stockSuficiente = true;
                // Descontar la cantidad pedida del stock
                $helado['stock'] -= $cantidadVendida;
                $heladoActualizado = $helado; // Guardamos el helado para usarlo en la venta
            }
            break;
        }
    }

    if (!$heladoEncontrado) {
        echo json_encode(['error' => 'ERROR: El helado no existe']);
        exit;
    }
    if (!$stockSuficiente) {
        echo json_encode(['error' => 'ERROR: Stock insuficiente']);
        exit;
    }

    // Se realiza la conexion a la DB
    $database = new Database($config);
    $db = $database->getConnection();

    // Genero un numero de pedido aleatorio
    $numeroPedido = rand(1000, 9999);
    $fecha = date('Y-m-d H:i:s');

    // Obtener la parte del email (nombre/usuario) antes del '@'
    $emailUsuario = explode('@', $email)[0];

    // Crear el nombre de la imagen: sabor+tipo+vaso+email(fecha de la venta)
    $nombreImagen = $sabor . '_' . $tipo . '_' . $vaso . '_' . $emailUsuario . '_' . date('Ymd_His') . '.jpg';
    $rutaImagen = $imageDir . $nombreImagen;

    // Mover la imagen subida a la carpeta especificada
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen)) {
        echo "Imagen subida con exito.\n";
    } else {
        echo json_encode(['error' => 'ERROR: Error al subir la imagen.']);
        exit;
    }

    // Preparar la consulta para insertar la venta en la base de datos
    $stmt = $db->prepare("INSERT INTO ventas (email, sabor, tipo, cantidad, fecha, numero_pedido) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssiss", $email, $sabor, $tipo, $cantidadVendida, $fecha, $numeroPedido);

    // Ejecuta la consulta
    if ($stmt->execute()) {
        // Guardar los cambios en el archivo JSON (actualizando el stock)
        if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => 'Venta registrada exitosamente', 'numero_pedido' => $numeroPedido]);
        } else {
            echo json_encode(['error' => 'ERROR: Error al actualizar el stock en el archivo']);
        }
    } else {
        echo json_encode(['error' => 'ERROR: Error al registrar la venta en la base de datos']);
    }

    // Se cierra la conexion
    $stmt->close();
    $db->close();
} else {
    echo json_encode(['error' => 'ERROR: Metodo no permitido.']);
}
