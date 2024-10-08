<?php
require "./Clases/Producto.php";

$jsonFile = "./Registros/tienda.json";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo = $_POST["titulo"];
    $tipo = $_POST["tipo"];
    $formato = $_POST["formato"];

    if (empty($titulo) || empty($tipo) || empty($formato)) {
        echo "ERROR: Faltan datos obligatorios en el body de la peticion.\n";
        exit;
    }

    $lista_productos = Archivo::DescargarArrayJSON($jsonFile);

    if ($lista_productos == []) {
        echo "ERROR: No se encontraron productos en el archivo.\n";
        exit;
    }

    $resultado = Producto::verificarProducto($lista_productos, $titulo, $tipo, $formato);
    echo $resultado;
} else {
    echo "ERROR: Metodo no permitido.\n";
}
