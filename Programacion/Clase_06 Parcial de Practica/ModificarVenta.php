<?php
require "./Classes/Helado.php";
require "./Classes/Venta.php";
require "./Classes/DataBase.php";
require "./Classes/Archivo.php";
$valores = include "./Registros/opciones_validas.php";

$config = require "./db/config.php";
$jsonFile = "./Registros/heladeria.json";
$tipos_validos = $valores['tipos_validos'];
$vasos_validos = $valores['vasos_validos'];

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // Leer el cuerpo de la solicitud PUT
    parse_str(file_get_contents("php://input"), $_PUT);

    $numeroPedido = isset($_PUT['numero_pedido']) ? $_PUT['numero_pedido'] : null;
    $email = isset($_PUT['email']) ? $_PUT['email'] : null;
    $sabor = isset($_PUT['sabor']) ? $_PUT['sabor'] : null;
    $tipo = isset($_PUT['tipo']) ? $_PUT['tipo'] : null;
    $vaso = isset($_PUT['vaso']) ? $_PUT['vaso'] : null;
    $cantidad = isset($_PUT['cantidad']) ? $_PUT['cantidad'] : null;

    if (empty($numeroPedido) || empty($email) || empty($sabor) || empty($tipo) || empty($vaso) || empty($cantidad)) {
        echo "ERROR: Faltan datos obligatorios.\n";
        exit;
    }

    if (!Helado::VerificarTipo($tipo, $tipos_validos)) {
        echo "ERROR: El TIPO ingresado es invalido.\n";
        exit;
    } else if (!Helado::VerificarVaso($vaso, $vasos_validos)) {
        echo "ERROR: El VASO ingresado es invalido.\n";
        exit;
    } else if (!Venta::VerificarEmail($email)) {
        echo "ERROR: El EMAIL ingresado es invalido.\n";
        exit;
    }

    $lista_helados = Archivo::DescargarArrayJSON($jsonFile);

    // Verificar si el número de pedido existe en la base de datos
    $database = new Database($config);
    $db = $database->getConnection();
    $stmt = $db->prepare("SELECT * FROM ventas WHERE numero_pedido = ?");
    $stmt->bind_param("i", $numeroPedido);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $stmt = $db->prepare("UPDATE ventas SET email = ?, sabor = ?, tipo = ?, cantidad = ?, vaso = ? WHERE numero_pedido = ?");
        $stmt->bind_param("sssisi", $email, $sabor, $tipo, $cantidad, $vaso, $numeroPedido);

        if ($stmt->execute()) {
            $result = Venta::VerificarPosibleVenta($lista_helados, new Venta($email, $sabor, $tipo, $vaso, $cantidad));
            if (file_put_contents($jsonFile, json_encode($result[2], JSON_PRETTY_PRINT))) {
                echo "VENTA MODIFICADA: El pedido numero $numeroPedido ha sido modificado correctamente.\n";
            } else {
                echo "ERROR: No se pudo actualizar el archivo JSON.\n";
            }
        } else {
            echo "ERROR: No se pudo modificar el pedido en la base de datos.\n";
        }
    } else {
        echo "ERROR: No existe un pedido con el numero $numeroPedido.\n";
    }

    Database::closeConnection($db, $stmt);
} else {
    echo "ERROR: Metodo no permitido.\n";
}
?>