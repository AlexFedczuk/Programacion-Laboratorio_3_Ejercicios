<?php
$jsonFile = 'heladeria.json';
$imageDir = 'ImagenesDeHelados/2024/';

// Verificar existencia del directorio de imagenes
if (!is_dir($imageDir)) {
    mkdir($imageDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sabor = $_POST['sabor'];
    $precio = $_POST['precio'];
    $tipo = $_POST['tipo'];
    $vaso = $_POST['vaso'];
    $stock = $_POST['stock'];
    
    if (!in_array($tipo, ['Agua', 'Crema']) || !in_array($vaso, ['Cucurucho', 'Plastico'])) {
        echo json_encode(['error' => 'ERROR: Tipo o Vaso invalido']);
        exit;
    }

    // Verificar si se ha subido una imagen
    if (isset($_FILES['imagen'])) {
        $imagen = $_FILES['imagen'];
        $imagenNombre = $sabor . '_' . $tipo . '.jpg';
        $imagenPath = $imageDir . $imagenNombre;

        // Guardar la imagen en el directorio de imágenes
        if (move_uploaded_file($imagen['tmp_name'], $imagenPath)) {
            echo "Imagen subida con exito.\n";
        } else {
            echo json_encode(['error' => 'ERROR: Error al subir la imagen']);
            exit;
        }
    } else {
        echo json_encode(['error' => 'ERROR: Imagen no proporcionada']);
        exit;
    }

    if (file_exists($jsonFile)) {
        $data = json_decode(file_get_contents($jsonFile), true);
    } else {
        $data = [];
    }

    // Emular ID autoincremental
    $newId = count($data) > 0 ? end($data)['id'] + 1 : 1;

    // Verificar si el helado ya existe, chequeando que sea el mismo sabor y tipo
    $found = false;
    foreach ($data as &$item) {
        if ($item['sabor'] == $sabor && $item['tipo'] == $tipo) {
            $item['precio'] = $precio;
            $item['stock'] += $stock;
            $found = true;
            break;
        }
    }

    // Si no se encontró el helado, creamos uno nuevo
    if (!$found) {
        $nuevoHelado = [
            'id' => $newId,
            'sabor' => $sabor,
            'precio' => $precio,
            'tipo' => $tipo,
            'vaso' => $vaso,
            'stock' => $stock,
            'imagen' => $imagenNombre
        ];
        $data[] = $nuevoHelado;
    }

    // Guardar los datos actualizados en el archivo JSON
    if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => 'Helado registrado/actualizado con éxito']);
    } else {
        echo json_encode(['error' => 'Error al guardar los datos']);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}