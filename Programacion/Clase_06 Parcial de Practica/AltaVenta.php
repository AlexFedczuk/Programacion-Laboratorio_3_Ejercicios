<?php
require "./Classes/Helado.php";
require "./Classes/Venta.php";
require "./Classes/DataBase.php";
$valores = include "./Registros/opciones_validas.php";

$config = require "./db/config.php";
$jsonFile = "./Registros/heladeria.json";
$imageDir = "./ImagenesDeHelados/2024/";
$tipos_validos = $valores['tipos_validos'];
$vasos_validos = $valores['vasos_validos'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $sabor = $_POST['sabor'];
    $tipo = $_POST['tipo'];
    $vaso = $_POST['vaso'];
    $cantidadVendida = $_POST['stock'];
    $imagen = $_FILES['imagen'];

    if (empty($email) || empty($sabor) || empty($tipo) || empty($vaso) || empty($cantidadVendida) || empty($imagen)) {
        echo "ERROR: Faltan datos obligatorios en el body.\n";
        exit;
    }

    if (!Helado::VerificarTipo($tipo, $tipos_validos) || !Helado::VerificarVaso($vaso, $vasos_validos)) {
        echo "ERROR: Tipo o Vaso invalido ingresado.\n";
        exit;
    }

    $venta_ingresada = new Venta($email, $sabor, $tipo, $vaso, $cantidadVendida);

    $lista_helados = Archivo::DescargarArrayJSON($jsonFile);

    $result = Venta::VerificarPosibleVenta($lista_helados, $sabor, $tipo, $cantidadVendida);
    if ($result[0] && $result[1]){        
        $venta_ingresada->setNumeroPedido(rand(1000, 9999)); // Genero un numero de pedido.
        $venta_ingresada->setFecha(date('Y-m-d H:i:s')); // Su fecha.
        $usuario = explode('@', $venta_ingresada->getEmail())[0]; // Obtengo la parte del email (nombre/usuario) antes del '@'.        
        $nombreImagen = Venta::CrearNombreImagenVenta($venta_ingresada, $usuario);// Crear el nombre de la imagen.
        $rutaImagen = $imageDir . $nombreImagen;
    }else{
        if (!$result[0]) {
            echo "ERROR: El helado no existe.\n";
            exit;
        }else if (!$$result[1]) {
            echo "ERROR: Stock insuficiente.\n";
            exit;
        }
    }    

    if (!is_dir($imageDir)) {
        mkdir($imageDir, 0777, true);
    }
    
    // Mover la imagen subida a la carpeta especificada.
    if (move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
        echo "Imagen subida con exito.\n";
    } else {
        echo "ERROR: Error al subir la imagen.\n";
        exit;
    }

    // Se realiza la conexion a la DB
    $database = new Database($config);
    $db = $database->getConnection();

    if($db){
        // Preparar la consulta para insertar la venta en la base de datos
        $stmt = $db->prepare("INSERT INTO ventas (email, sabor, tipo, cantidad, fecha, numero_pedido) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssiss", $email, $sabor, $tipo, $cantidadVendida, $fecha, $numeroPedido);

        // Ejecuta la consulta
        if ($stmt->execute()) {
            // Guardar los cambios en el archivo JSON (actualizando el stock)
            if (file_put_contents($jsonFile, json_encode($lista_helados, JSON_PRETTY_PRINT))) {
                echo "SUCCES: Venta registrada exitosamente. Numero de pedido: $numeroPedido\n";
            } else {
                echo "ERROR: Error al actualizar el stock en el archivo.\n";
            }
        } else {
            echo "ERROR: Error al registrar la venta en la base de datos.\n";
        }
    }
    
    // Se cierra la conexion
    $stmt->close();
    $db->close();
} else {
    echo "ERROR: Metodo no permitido.\n";
}
