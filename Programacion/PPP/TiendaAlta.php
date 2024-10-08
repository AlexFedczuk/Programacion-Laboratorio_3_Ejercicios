<?php
require "./Clases/Producto.php";

$jsonFile = "./Registros/tienda.json";
$imageDir = "./ImagenesDeProductos/2024/";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo = $_POST["titulo"];
    $precio = $_POST["precio"];
    $tipo = $_POST["tipo"];
    $anoDeSalida = $_POST["anioDeSalida"];
    $formato = $_POST["formato"];
    $stock = $_POST["stock"];
    $imagen = $_FILES["imagen"]["tmp_name"];

    if (empty($titulo) || empty($precio) || empty($tipo) || empty($anoDeSalida) || empty($formato) || empty($stock) || empty($imagen)) {
        echo "ERROR: Faltan datos obligatorios en el body de la peticion.\n";
        exit;
    }

    if (!Producto::validarTipo($tipo)) {
        echo "ERROR: El TIPO ingresado es invalido.\n";
        exit;
    }

    if (!Producto::validarFormato($formato)) {
        echo "ERROR: El FORMATO ingresado es invalido.\n";
        exit;
    }

    $lista_productos = Archivo::descargarArrayJSON($jsonFile);

    $producto = new Producto($titulo, $precio, $tipo, $anoDeSalida, $formato, $stock, $imagen);

    if ($producto->guardarImagen($imageDir)) {
        echo "Imagen subida con exito.\n";
    } else {
        echo "ERROR: No se pudo subir la imagen.\n";
        exit;
    }

    if (Producto::guardarProducto($lista_productos, $producto, $jsonFile)) {
        echo "SUCCESS: Producto registrado/actualizado con exito.\n";
    } else {
        echo "ERROR: No se han podido guardar los datos.\n";
    }
} else {
    echo "ERROR: Metodo de peticion no permitido.\n";
}