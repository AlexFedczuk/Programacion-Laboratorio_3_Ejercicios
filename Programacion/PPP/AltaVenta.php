<?php
require "./Clases/Venta.php";

$jsonFile = "./Registros/ventas.json";
$productFile = "./Registros/tienda.json";
$imageDir = "./ImagenesDeVenta/2024/";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $titulo = $_POST["titulo"];
    $tipo = $_POST["tipo"];
    $formato = $_POST["formato"];
    $cantidad = $_POST["cantidad"];
    $imagen = $_FILES["imagen"];

    if (empty($email) || empty($titulo) || empty($tipo) || empty($formato) || empty($cantidad) || empty($imagen)) {
        echo "ERROR: Faltan datos obligatorios en el body.\n";
        exit;
    }

    $lista_productos = Archivo::DescargarArrayJSON($productFile);

    if ($lista_productos == []) {
        echo "ERROR: No se encontraron productos en el archivo.\n";
        exit;
    }

    $venta = new Venta($email, $titulo, $tipo, $formato, $cantidad);

    list($stockValido, $lista_productos_actualizada) = Venta::verificarStock($lista_productos, $venta);

    if (!$stockValido) {
        echo "ERROR: Stock insuficiente para completar la venta.\n";
        exit;
    }

    if (!is_dir($imageDir)) {
        mkdir($imageDir, 0777, true);
        echo "ADVERTENCIA: El directorio '$imageDir' no existia. Se ha creado para guardar la imagen de la venta.\n";
    }

    $nombreImagen = Venta::generarNombreImagenVenta($titulo, $tipo, $formato, $email);
    $rutaImagen = $imageDir . $nombreImagen;

    if (move_uploaded_file($imagen["tmp_name"], $rutaImagen)) {
        echo "Imagen de la venta subida con exito.\n";
    } else {
        echo "ERROR: Error al subir la imagen.\n";
        exit;
    }

    if (Venta::registrarVenta($jsonFile, $venta, $rutaImagen)) {
        if (Archivo::CargarArrayJSON($productFile, $lista_productos_actualizada)) {
            echo "SUCCESS: Venta registrada exitosamente. Numero de pedido: " . $venta->getNumeroPedido() . "\n";
        } else {
            echo "ERROR: No se pudo actualizar el stock en el archivo de productos.\n";
        }
    } else {
        echo "ERROR: No se pudo registrar la venta en el archivo de ventas.\n";
    }
} else {
    echo "ERROR: Metodo no permitido.\n";
}