<?php
require "./Classes/Helado.php";
require "./Classes/Venta.php";
require "./Classes/DataBase.php";
require "./Classes/Archivo.php";
$valores = include "./Registros/opciones_validas.php";

$config = require "./db/config.php";
$jsonFile = "./Registros/heladeria.json";
$imageDir = "./ImagenesDeLaVenta/2024/";
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

    if (!Helado::VerificarTipo($tipo, $tipos_validos)) {
        echo "ERROR: El TIPO ingresado es invalido.\n";
        exit;
    }else if(!Helado::VerificarVaso($vaso, $vasos_validos)){
        echo "ERROR: El VASO ingresado es invalido.\n";
        exit;        
    }else if(!Venta::VerificarEmail($email)) {
        echo "ERROR: El EMAIL ingresado es invalido.\n";
        exit;
    }

    $venta_ingresada = new Venta($email, $sabor, $tipo, $vaso, $cantidadVendida);

    $lista_helados = Archivo::DescargarArrayJSON($jsonFile);

    $result = Venta::VerificarPosibleVenta($lista_helados, $venta_ingresada);
    $lista_helados = $result[2];
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
        }else if (!$result[1]) {
            echo "ERROR: Stock insuficiente.\n";
            exit;
        }
    }
    
    $venta_ingresada->Mostrar();

    if (!is_dir($imageDir)) {
        mkdir($imageDir, 0777, true);
        echo "ADVERTENCIA: El directorio '$imageDir' no existe. Se acaba de crear para poder subir la imagen de la venta.\n";
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
        $fecha = $venta_ingresada->getFecha();
        $numeroPedido = $venta_ingresada->getNumeroPedido();
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
        
    Database::closeConnection($db, $stmt);
} else {
    echo "ERROR: Metodo no permitido.\n";
}
