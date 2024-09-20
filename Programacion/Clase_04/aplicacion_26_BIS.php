<?php
/*
Aplicación No 26 (RealizarVenta)
Archivo: RealizarVenta.php
método:POST

Recibe los datos del producto(código de barra), del usuario (el id )y la cantidad de ítems ,por
POST.

Verificar que el usuario y el producto exista y tenga stock.
crea un ID autoincremental(emulado, puede ser un random de 1 a 10.000). carga
los datos necesarios para guardar la venta en un nuevo renglón.

Retorna un :
“venta realizada”Se hizo una venta
“no se pudo hacer“si no se pudo hacer
Hacer los métodos necesaris en las clases
*/
require "classProducto.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {    
    $codigo_de_barra = $_POST["codigo_de_barra"] ?? "";
    $nombre = $_POST["nombre"] ?? "";
    $tipo = $_POST["tipo"] ?? "";
    $stock = $_POST["stock"] ?? null;
    $precio = $_POST["precio"] ?? null;

    
    if ($codigo_de_barra && $nombre && $tipo && $stock && $precio) {
        $producto = new Producto($codigo_de_barra, $nombre, $tipo, $stock, $precio);
        $directorio = "Listas/productos.json";
        
        if (Producto::VerificarProductoEnLista(Producto::CargarProductoDesdeJSON($directorio), $producto)) {
            if ($producto->ActualizarStockProducto($directorio, $producto)) {
                echo "Exito! El producto '".$producto->GetNombre()."' ha sido actualizado.\n";
            }
        } else {
            if ($producto->GuardarProductoJSON($directorio)) {
                echo "Exito! El producto '".$producto->GetNombre()."' se ha cargado a la lista.\n";
            }            
        }      
    } else {
        echo "Error: Faltan datos para cargar un producto.\n";        
    }
} else {
    echo "Error: Método incorrecto. Debes usar del tipo POST.\n";
}
