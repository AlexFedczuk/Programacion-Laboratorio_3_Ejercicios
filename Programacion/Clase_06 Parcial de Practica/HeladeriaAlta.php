<?php
require "./Classes/Helado.php";
require "./Classes/Archivo.php"; // Clase para manejo de archivos

$valores = include 'archivo.php';
$jsonFile = "./Registros/heladeria.json";
$imageDir = "./ImagenesDeHelados/2024/";
$tipos_validos = $valores['tipos_validos'];
$vasos_validos = $valores['vasos_validos'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $campos_obligatorios = ['sabor', 'precio', 'tipo', 'vaso', 'stock', 'imagen'];
    foreach ($campos_obligatorios as $campo) {
        if (empty($_POST[$campo]) && !isset($_FILES['imagen'])) {
            echo "ERROR: Faltan datos obligatorios: $campo.\n";
            exit;
        }
    }

    $sabor = $_POST['sabor'];
    $precio = $_POST['precio'];
    $tipo = $_POST['tipo'];
    $vaso = $_POST['vaso'];
    $stock = $_POST['stock'];
    $imagen = $_FILES['imagen'];

    if (!Helado::VerificarTipo($tipo, $tipos_validos)) {
        echo "ERROR: El TIPO ingresado es inválido.\n";
        exit;
    } elseif (!Helado::VerificarVaso($vaso, $vasos_validos)) {
        echo "ERROR: El VASO ingresado es inválido.\n";
        exit;        
    }

    $helado_ingresado = new Helado($sabor, $precio, $tipo, $vaso, $stock, $imagen['tmp_name']);

    $lista_helados = Archivo::DescargarArrayJSON($jsonFile);
    if ($lista_helados === []) {
        echo "ADVERTENCIA: El archivo '$jsonFile' no existe. Se ha creado un listado de helados vacío.\n";
    }

    if (Helado::VerificarExistenciaHelado($lista_helados, $helado_ingresado)) {
        $lista_helados = Helado::ActualizarHelado($lista_helados, $helado_ingresado);
    } else {
        $id = Helado::GenerarID($lista_helados);
        $helado_ingresado->setId($id);
        $lista_helados = Helado::Alta($lista_helados, $helado_ingresado);
    }

    if (Helado::GuardarImagenHelado($helado_ingresado, $imageDir)) {
        echo "SUCCES: Se ha subido la imagen con éxito.\n";
    } else {
        echo "ERROR: No se ha podido subir la imagen.\n";
        exit;
    }

    if (Archivo::CargarArrayJSON($jsonFile, $lista_helados)) {
        echo "SUCCES: Helado registrado/actualizado con éxito.\n";
    } else {
        echo "ERROR: No se han podido guardar los datos.\n";
    }
} else {
    echo "ERROR: Método de petición no permitido.\n";
}