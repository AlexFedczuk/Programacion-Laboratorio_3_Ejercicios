<?php
/*
Aplicación No 25 ( AltaProducto)
Archivo: altaProducto.php
método:POST

Recibe los datos del producto(código de barra (6 sifras ),nombre ,tipo, stock, precio )por POST ,
crea un ID autoincremental(emulado, puede ser un random de 1 a 10.000). crear un objeto y
utilizar sus métodos para poder verificar si es un producto existente, si ya existe el producto se le
suma el stock , de lo contrario se agrega al documento en un nuevo renglón
Retorna un :
“Ingresado” si es un producto nuevo
“Actualizado” si ya existía y se actualiza el stock.
“no se pudo hacer“si no se pudo hacer
Hacer los métodos necesarios en la clase
*/
require "classProducto.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {    
    $codigo_de_barra = $_POST["codigo_de_barra"] ?? null;
    $nombre = $_POST["nombre"] ?? "";
    $tipo = $_POST["tipo"] ?? "";
    $stock = $_POST["stock"] ?? null;
    $precio = $_POST["precio"] ?? null;

    
    if ($codigo_de_barra && $nombre && $tipo && $stock && $precio) {
        $producto = new Producto($codigo_de_barra, $nombre, $tipo, $stock, $precio);
        
        $directorio = "Listas/productos.json";
        if(Producto::VerificarProductoEnLista(Producto::CargarProductoDesdeJSON($directorio), $producto) === false) {
            if ($usuario->GuardarUsuarioJSON($directorio)) {
                echo "Exito! El usuario '".$usuario->GetNombre()."' ha sido registrado.\n";
            } else {
                echo "Error: El usuario '".$usuario->GetNombre()."' NO ha sido registrado.\n";
            }
        }        
    } else {
        echo "Error: Faltan datos para cargar un usuario.\n";
    }
} else {
    echo "Error: Método incorrecto. Debes usar del tipo POST.\n";
}
