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
require "classUsuario.php";
require "classProducto.php";
require "classVenta.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {    
    $codigo_de_barra = $_POST["codigo_de_barra"] ?? "";
    $usuario_id = $_POST["usuario_id"] ?? null;
    $cantidad_items = $_POST["cantidad_items"] ?? null;

    
    if ($codigo_de_barra && $usuario_id && $cantidad_items) {        
        $directorio_usuarios = "Listas/usuarios.json";
        $directorio_productos = "Listas/productos.json";
        $directorio_ventas = "Listas/productos.json";

        if (Venta::VerificarPosibleVenta($directorio_usuarios, $directorio_productos, $usuario_id, $codigo_de_barra, $cantidad_items)){
            $venta = new Venta($codigo_de_barra, $usuario_id, $cantidad_items);

            if($venta->GuardarVentaJSON($directorio_ventas)){
                echo "Exito! Venta realizada.\n";
            }else{
                echo "Error: No se pudo hacer.\n";
            }
        }
    } else {
        echo "Error: Faltan datos.\n";
    }
} else {
    echo "Error: Metodo incorrecto, se debe utilizar el tipo POST.\n";
}
