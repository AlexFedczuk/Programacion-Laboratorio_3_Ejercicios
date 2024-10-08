<?php
require "./Classes/Helado.php";
require "./Classes/DataBase.php";
require "./Classes/Archivo.php";
require "./Classes/Venta.php"; // Si no está incluida ya

$valores = include "./Registros/opciones_validas.php";
$config = require "./db/config.php";
$jsonFile = "./Registros/heladeria.json";
$imageDir = "./ImagenesDeLaVenta/2024/";

$tipos_validos = $valores['tipos_validos'];
$vasos_validos = $valores['vasos_validos'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $campos_obligatorios = ['email', 'sabor', 'tipo', 'vaso', 'stock', 'imagen'];
    foreach ($campos_obligatorios as $campo) {
        if (empty($_POST[$campo]) || empty($_FILES['imagen'])) {
            echo "ERROR: Faltan datos obligatorios: $campo.\n";
            exit;
        }
    }

    $email = $_POST['email'];
    $sabor = $_POST['sabor'];
    $tipo = $_POST['tipo'];
    $vaso = $_POST['vaso'];
    $cantidadVendida = $_POST['stock'];
    $imagen = $_FILES['imagen'];

    if (!Helado::VerificarTipo($tipo, $tipos_validos)) {
        echo "ERROR: El TIPO ingresado es inválido.\n";
        exit;
    }

    if (!Helado::VerificarVaso($vaso, $vasos_validos)) {
        echo "ERROR: El VASO ingresado es inválido.\n";
        exit;
    }

    if (!Venta::VerificarEmail($email)) {
        echo "ERROR: El EMAIL ingresado es inválido.\n";
        exit;
    }

    $venta_ingresada = new Venta($email, $sabor, $tipo, $vaso, $cantidadVendida);

    $lista_helados = Archivo::DescargarArrayJSON($jsonFile);

    $result = Venta::VerificarPosibleVenta($lista_helados, $venta_ingresada);
    $lista_helados = $result[2];

    if (!$result[0]) {
        echo "ERROR: El helado no existe.\n";
        exit;
    } elseif (!$result[1]) {
        echo "ERROR: Stock insuficiente.\n";
        exit;
    }

    $venta_ingresada->setNumeroPedido(rand(1000, 9999));
    $venta_ingresada->setFecha(date('Y-m-d H:i:s'));

    $usuario = explode('@', $venta_ingresada->getEmail())[0];
    $nombreImagen = Venta::CrearNombreImagenVenta($venta_ingresada, $usuario);
    $rutaImagen = $imageDir . $nombreImagen;

    $venta_ingresada->Mostrar();

    if (!is_dir($imageDir)) {
        mkdir($imageDir, 0777, true);
        echo "ADVERTENCIA: El directorio '$imageDir' no existía. Se acaba de crear.\n";
    }

    if (!move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
        echo "ERROR: No se pudo subir la imagen.\n";
        exit;
    }
    echo "Imagen subida con éxito.\n";

    $db = Database::getDB($config);

    if ($db) {
        $fecha = $venta_ingresada->getFecha();
        $numeroPedido = $venta_ingresada->getNumeroPedido();

        $query = "INSERT INTO ventas (email, sabor, tipo, cantidad, fecha, numero_pedido) VALUES (?, ?, ?, ?, ?, ?)";
        $params = [$email, $sabor, $tipo, $cantidadVendida, $fecha, $numeroPedido];

        $resultado = Database::Insertar($db, $query, $params, "sssiss");

        if ($resultado === true) {
            if (file_put_contents($jsonFile, json_encode($lista_helados, JSON_PRETTY_PRINT))) {
                echo "SUCCESS: Venta registrada exitosamente. Número de pedido: $numeroPedido\n";
            } else {
                echo "ERROR: Error al actualizar el stock en el archivo.\n";
            }
        } else {
            echo "ERROR: " . $resultado . "\n";
        }
    }

    Database::closeConnection($db);
} else {
    echo "ERROR: Método no permitido.\n";
}