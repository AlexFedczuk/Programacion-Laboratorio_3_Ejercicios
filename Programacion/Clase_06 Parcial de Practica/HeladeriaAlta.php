<?php
$jsonFile = 'heladeria.json';
$imageDir = 'ImagenesDeHelados/2024/';

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
    
    // Creo un objeto HELADO para las siguientes operaciones.
    $helado_ingresado = new Helado($sabor, $precio, $tipo, $vaso, $stock, $imagen);

    // Cargo una variable lista/array con los registros en el archivo JSON.
    if (file_exists($jsonFile)) {
        $lista_helados = json_decode(file_get_contents($jsonFile), true);
    } else {
        $lista_helados = [];
        echo "ADVERTENCIA: El archivo '$jsonFile' no existe. Se ha creado un listado de helados vacio.\n";        
    }

    if($lista_helados === [] || !Helado::VerificarExistenciaHelado($lista_helados, $helado_ingresado)){
        // Si el helado NO EXISTE en la lista, se da de ALTA.
        $id = Helado::GenerarID($lista_helados);
        $helado_ingresado->setId($id);
        $lista_helados = Helado::Alta($lista_helados, $helado_ingresado);
    }else{
        // Si el helado EXISTE en la lista, se ACTUALIZA.
        Helado::ActualizarHelado($lista_helados, $helado_ingresado);
    }

    // Verificar existencia del directorio de imagenes
    if (!is_dir($imageDir)) {
        mkdir($imageDir, 0777, true);
    }

    // Guardar la imagen en el directorio de imágenes
    if(Helado::GuardarImagenHelado($helado_ingresado, $imageDir)) {
        echo json_encode(['succes' => 'Imagen subida con exito.']);
    }else{
        echo json_encode(['error' => 'ERROR: Error al subir la imagen']);
        exit;
    }

    // Guardar los datos actualizados en el archivo JSON
    if (file_put_contents($jsonFile, json_encode($lista_helados, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => 'Helado registrado/actualizado con exito']);
    } else {
        echo json_encode(['error' => 'ERROR" Error al guardar los datos']);
    }
} else {
    echo json_encode(['error' => 'ERROR: Método no permitido']);
}