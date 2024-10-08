<?php
require "./Classes/Helado.php";
require "./Classes/DataBase.php";
require "./Classes/Archivo.php";
require "./Classes/Venta.php";
require "./Classes/Cupon.php";

$valores = include "./Registros/opciones_validas.php";
$config = require "./db/config.php";
$jsonFile = "./Registros/heladeria.json";
$cuponesFile = "./Registros/cupones.json";
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
    $cupon_codigo = $_POST['cupon'] ?? null;

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

    // Cargar JSON de helados y verificar existencia/stock
    $lista_helados = Archivo::DescargarArrayJSON($jsonFile);
    $venta_ingresada = new Venta($email, $sabor, $tipo, $vaso, $cantidadVendida);

    $result = Venta::VerificarPosibleVenta($lista_helados, $venta_ingresada);
    if (!$result[0]) {
        echo "ERROR: El helado no existe.\n";
        exit;
    } elseif (!$result[1]) {
        echo "ERROR: Stock insuficiente.\n";
        exit;
    }

    $precioHelado = Helado::getPrecioFromLista($lista_helados, $sabor, $tipo);

    if ($precioHelado == 0) {
        echo "ERROR: No se pudo determinar el precio del helado.\n";
        exit;
    }

    // Aplicar cupón si existe
    $descuento = 0;
    if ($cupon_codigo) {
        $cupones = Archivo::DescargarArrayJSON($cuponesFile);
        $cuponAplicado = Cupon::AplicarCupon($cupon_codigo, $cupones);

        if ($cuponAplicado['valido']) {
            $descuento = $cuponAplicado['descuento'];
            Cupon::MarcarComoUsado($cupon_codigo, $cuponesFile, $cupones);
            echo "Cupon aplicado. Descuento: $descuento%\n";
        } else {
            echo "ERROR: Cupón inválido o ya usado.\n";
            exit;
        }
    }

    // Generar número de pedido y fecha de la venta
    $venta_ingresada->setNumeroPedido(rand(1000, 9999));
    $venta_ingresada->setFecha(date('Y-m-d H:i:s'));

    // Calcular el importe total con el precio obtenido desde el JSON
    $importeTotal = ($cantidadVendida * $precioHelado) * (1 - $descuento / 100);
    $venta_ingresada->setImporteFinal($importeTotal); // Importe final después del descuento


    // Mostrar detalles de la venta
    $venta_ingresada->Mostrar();

    // Guardar la imagen de la venta
    $usuario = explode('@', $venta_ingresada->getEmail())[0];
    $nombreImagen = Venta::CrearNombreImagenVenta($venta_ingresada, $usuario);
    $rutaImagen = $imageDir . $nombreImagen;

    if (!is_dir($imageDir)) {
        mkdir($imageDir, 0777, true);
        echo "ADVERTENCIA: El directorio '$imageDir' no existía. Se acaba de crear.\n";
    }

    if (move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
        echo "Imagen subida con éxito.\n";
    } else {
        echo "ERROR: No se pudo subir la imagen.\n";
        exit;
    }

    // Guardar la venta en la base de datos
    $db = Database::getDB($config);
    if ($db) {
        $query = "INSERT INTO ventas (email, sabor, tipo, cantidad, fecha, numero_pedido, importe_final, descuento) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $params = [$email, $sabor, $tipo, $cantidadVendida, $venta_ingresada->getFecha(), $venta_ingresada->getNumeroPedido(), $importeTotal, $descuento];
        
        $resultado = Database::Insertar($db, $query, $params, "sssissdi");

        if ($resultado === true) {
            // Guardar la actualización del stock en el archivo JSON
            if (file_put_contents($jsonFile, json_encode($lista_helados, JSON_PRETTY_PRINT))) {
                echo "SUCCESS: Venta registrada exitosamente. Número de pedido: " . $venta_ingresada->getNumeroPedido() . "\n";
            } else {
                echo "ERROR: Error al actualizar el stock en el archivo.\n";
            }
        } else {
            echo "ERROR: No se pudo registrar la venta.\n";
        }
    }

    Database::closeConnection($db);
} else {
    echo "ERROR: Método no permitido.\n";
}