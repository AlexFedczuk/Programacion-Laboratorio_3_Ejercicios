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
    $imagen = $_FILES['imagen'];

    if (empty($sabor) || empty($precio) || empty($tipo) || empty($vaso) || empty($stock) || empty($imagen)) {
        echo json_encode(['error' => 'ERROR: Faltan datos obligatorios o la imagen.']);
        exit;
    }
    
    // Verificar si se han ingresado tipo y vaso valido.
    $tipos_validos = ['Agua', 'Crema'];
    $vasos_validos = ['Cucurucho', 'Plastico'];
    if (!Helado::VerificarTipo($tipo, $tipos_validos) || !Helado::VerificarVaso($vaso, $vasos_validos)) {
        echo json_encode(['error' => 'ERROR: Tipo o Vaso invalido']);
        exit;
    }

    // Guardar la imagen en el directorio de imágenes
    if(Helado::GuardarImagen($imagen, $sabor, $tipo, $imageDir)) {
        echo json_encode(['succes' => 'Imagen subida con exito.']);
    }else{
        echo json_encode(['error' => 'ERROR: Error al subir la imagen']);
        exit;
    }

    if (file_exists($jsonFile)) {
        $data = json_decode(file_get_contents($jsonFile), true);
    } else {
        $data = [];
    }

    $id = Helado::GenerarID($data);

    // Verificar si el helado ya existe, chequeando que sea el mismo sabor y tipo
    if(Helado::VerificarExistenciaHelado($data, $sabor, $tipo)){
        Helado::ActualizarHelado($data, $sabor, $tipo, $precio, $stock);
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