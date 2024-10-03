<?php
$config = require 'config.php';
$jsonFile = 'heladeria.json';
$imageDir = 'ImagenesDeLaVenta/2024/';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $sabor = $_POST['sabor'];
    $tipo = $_POST['tipo'];
    $vaso = $_POST['vaso'];
    $cantidadVendida = $_POST['stock'];
    $imagen = $_FILES['imagen'];

    if (empty($email) || empty($sabor) || empty($tipo) || empty($vaso) || empty($cantidadVendida) || empty($imagen)) {
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

    $venta_ingresada = new Venta($email, $sabor, $tipo, $vaso, $cantidadVendida);

    if (file_exists($jsonFile)) {
        $lista_helados = json_decode(file_get_contents($jsonFile), true);
    } else {
        echo json_encode(['error' => 'ERROR: No se encontro el archivo de datos.']);
        exit;
    }

    $result = Venta::VerificarPosibleVenta($lista_helados, $sabor, $tipo, $cantidadVendida);
    if ($result[0] && $result[1]){        
        $venta_ingresada->setNumeroPedido(rand(1000, 9999)); // Genero un numero de pedido.
        $venta_ingresada->setFecha(date('Y-m-d H:i:s')); // Su fecha.
        $usuario = explode('@', $venta_ingresada->getEmail())[0]; // Obtengo la parte del email (nombre/usuario) antes del '@'.        
        $nombreImagen = Venta::CrearNombreImagenVenta($venta_ingresada, $usuario);// Crear el nombre de la imagen.
        $rutaImagen = $imageDir . $nombreImagen;
    }else{
        if (!$result[0]) {
            echo json_encode(['error' => 'ERROR: El helado no existe']);
            exit;
        }else if (!$$result[1]) {
            echo json_encode(['error' => 'ERROR: Stock insuficiente']);
            exit;
        }
    }    

    if (!is_dir($imageDir)) {
        mkdir($imageDir, 0777, true);

        // Mover la imagen subida a la carpeta especificada.
        if (move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
            echo "Imagen subida con exito.\n";
        } else {
            echo json_encode(['error' => 'ERROR: Error al subir la imagen.']);
            exit;
        }
    }    

    // Se realiza la conexion a la DB
    $database = new Database($config);
    $db = $database->getConnection();

    if($db){
        // Preparar la consulta para insertar la venta en la base de datos
        $stmt = $db->prepare("INSERT INTO ventas (email, sabor, tipo, cantidad, fecha, numero_pedido) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssiss", $venta->getEmail(), $venta->getSabor(), $venta->getTipo(), $venta->getCantidadVendida(), $venta->getFecha(), $venta->getNumeroPedido());

        // Ejecuta la consulta
        if ($stmt->execute()) {
            // Guardar los cambios en el archivo JSON (actualizando el stock)
            if (file_put_contents($jsonFile, json_encode($lista_helados, JSON_PRETTY_PRINT))) {
                echo json_encode(['success' => 'Venta registrada exitosamente', 'numero_pedido' => $numeroPedido]);
            } else {
                echo json_encode(['error' => 'ERROR: Error al actualizar el stock en el archivo']);
            }
        } else {
            echo json_encode(['error' => 'ERROR: Error al registrar la venta en la base de datos']);
        }
    }
    
    // Se cierra la conexion
    $stmt->close();
    $db->close();
} else {
    echo json_encode(['error' => 'ERROR: Metodo no permitido.']);
}
