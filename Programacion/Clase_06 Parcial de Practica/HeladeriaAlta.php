<?php
require "./Classes/Helado.php";
$valores = include 'archivo.php';

$jsonFile = "./Registros/heladeria.json";
$imageDir = "./ImagenesDeHelados/2024/";
$tipos_validos = $valores['tipos_validos'];
$vasos_validos = $valores['vasos_validos'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sabor = $_POST['sabor'];
    $precio = $_POST['precio'];
    $tipo = $_POST['tipo'];
    $vaso = $_POST['vaso'];
    $stock = $_POST['stock'];
    $imagen = $_FILES['imagen'];

    if (empty($sabor) || empty($precio) || empty($tipo) || empty($vaso) || empty($stock) || empty($imagen)) {
        echo "ERROR: Faltan datos obligatorios en el body de la petición.\n";
        exit;
    }

    if (!Helado::VerificarTipo($tipo, $tipos_validos)) {
        echo "ERROR: El TIPO ingresado es invalido.\n";
        exit;
    }else if(!Helado::VerificarVaso($vaso, $vasos_validos)){
        echo "ERROR: El VASO ingresado es invalido.\n";
        exit;        
    }

    $helado_ingresado = new Helado($sabor, $precio, $tipo, $vaso, $stock, $imagen['tmp_name']);

    $lista_helados = Archivo::DescargarArrayJSON($jsonFile);
    if ($lista_helados == []){
        echo "ADVERTENCIA: El archivo '$jsonFile' no existe. Se ha creado un listado de helados vacio.\n";
    }

    if($lista_helados == [] || !Helado::VerificarExistenciaHelado($lista_helados, $helado_ingresado)){
        $id = Helado::GenerarID($lista_helados);
        $helado_ingresado->setId($id);
        $lista_helados = Helado::Alta($lista_helados, $helado_ingresado);
    }else{
        $lista_helados = Helado::ActualizarHelado($lista_helados, $helado_ingresado);
    }

    if(Helado::GuardarImagenHelado($helado_ingresado, $imageDir)) {
        echo "SUCCES: Se ha subido la imagen con exito.\n";
    }else{
        echo "ERROR: No se ha podido subir la imagen.\n";
        exit;
    }

    if(Archivo::CargarArrayJSON($jsonFile, $lista_helados)){
        echo "SUCCES: Helado registrado/actualizado con exito.\n";
    }else{
        echo "ERROR: No se han podido guardar los datos.\n";
    }
} else {
    echo "ERROR: Método de petición no permitido.\n";
}