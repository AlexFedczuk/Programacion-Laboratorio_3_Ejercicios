<?php
require "classUsuario.php";
require "classProducto.php";

class Venta {
    private int $_id;
    private string $_codigo_de_barra;
    private int $_usuario_id;
    private int $_cantidad_de_items;
    
    public function __construct(string $codigo_de_barra, int $usuario_id, int $cantidad_de_items, int $id = null) {
        $this->_id = $id === null ? $this->generarIdUnico() : $id;
        $this->_codigo_de_barra = $codigo_de_barra;
        $this->_usuario_id = $usuario_id;
        $this->_cantidad_de_items = $cantidad_de_items;
    }

    private function GenerarIdUnico() {
        $idsExistentes = $this->ObtenerIdsExistentes();
        do {
            $idGnerado = rand(1, 10000);
        } while (in_array($idGnerado, $idsExistentes));

        return $idGnerado;
    }

    private function ObtenerIdsExistentes() {
        $usuarios = json_decode(file_get_contents("Listas/usuarios.json"), true);
        $ids = [];

        if ($usuarios) {
            foreach ($usuarios as $usuario) {
                $ids[] = $usuario["id"];
            }
        }
        return $ids;
    }

    public function GetCodigoDeBarra(): string {
        return $this->_codigo_de_barra;
    }

    public function GetCantidadItems(): int {
        return $this->_cantidad_de_items;
    }

    public static function VerificarPosibleVenta(string $directorio_usuarios, string $directorio_productos, int $usuario_id, string $codigo_de_barra, int $cantidad_items): bool {
        $retorno = false;
        if (Usuario::BuscarUsuarioJSON($directorio_usuarios, $usuario_id)){
            if (Producto::BuscarProductoJSON($directorio_productos, $codigo_de_barra)){
                if (Producto::BuscarStockProductoJSON($directorio_productos, $codigo_de_barra, $cantidad_items)){
                    $retorno = true;
                }else {
                    echo "Error: No hay suficiente stock, para abastecer la cantidad solicitada: '$cantidad_items'.\n";
                }                
            }else{
                echo "Error: No se ha encontrado un producto en el archivo '$directorio_productos' con el código de barra '$codigo_de_barra'.\n";
            }
        }else {
            echo "Error: El 'id' ingresado ($usuario_id) no coincide con ninguno en la lista del archivo '$directorio_usuarios'.\n";
        }

        return $retorno;
    }

    public static function RealizarVenta(string $directorio_ventas, string $directorio_productos, Venta $venta): bool{
        $retorno = false;
        if(Venta::GuardarVentaJSON($directorio_ventas, $venta)){
            Producto::ActualizarStockProductoJSON($directorio_productos, $venta->GetCodigoDeBarra(), -$venta->GetCantidadItems());
            $retorno = true;
        }

        return $retorno;
    }

    public static function GuardarVentaJSON(string $archivoJson, Venta $venta): bool {
        $retorno = false;

        $lista = [];
        if (file_exists($archivoJson)) {
            $lista = json_decode(file_get_contents($archivoJson), true) ?? [];
        }

        $lista[] = [
            'id' => $venta->_id,
            'codigo_de_barra' => $venta->_codigo_de_barra,
            'usuario_id' => $venta->_usuario_id,
            'cantidad_de_items' => $venta->_cantidad_de_items
        ];

        if (file_put_contents($archivoJson, json_encode($lista, JSON_PRETTY_PRINT))) {
            $retorno = true;
        } else {
            echo "Error: No se pudo guardar en el archivo JSON: '$archivoJson'.\n";
        }

        return $retorno;
    }
}