<?php

class Producto {
    private $_id;
    private $_codigo_de_barra;
    private $_nombre;
    private $_tipo;
    private $_stock;
    private $_precio;
    
    public function __construct(int $codigo_de_barra, string $nombre, string $tipo, int $stock, float $precio, int $id = null) {
        $this->_id = $id === null ? $this->generarIdUnico() : $id;
        $this->_codigo_de_barra = $codigo_de_barra;
        $this->_nombre = $nombre;
        $this->_tipo = $tipo;
        $this->_stock = $stock;        
        $this->_precio = $precio;
    }

    private function generarIdUnico() {
        $idsExistentes = $this->obtenerIdsExistentes();
        do {
            $idGnerado = rand(1, 10000);
        } while (in_array($idGnerado, $idsExistentes));

        return $idGnerado;
    }

    private function obtenerIdsExistentes() {
        $productos = json_decode(file_get_contents("Listas\usuarios.json"), true);
        $ids = [];

        if ($productos) {
            foreach ($productos as $producto) {
                $ids[] = $producto["id"];
            }
        }
        return $ids;
    }

    public function GetId(): int {
        return $this->_id;
    }

    public function GetCodigoBarra(): int {
        return $this->_codigo_de_barra;
    }

    public function GetNombre(): string {
        return $this->_nombre;
    }

    public function GetTipo(): string {
        return $this->_tipo;
    }

    public function GetStock(): int {
        return $this->_stock;
    }

    public function GetPrecio(): float {
        return $this->_precio;
    }
    public function MostrarUsuario(): void{
        echo "Id: ".$this->GetId()."\n";
        echo "Codigo de Barra: ".$this->GetCodigoBarra()."\n";
        echo "Nombre: ".$this->GetNombre()."\n";      
        echo "Tipo: ".$this->GetTipo()."\n";
        echo "Stock: ".$this->GetStock()."\n";
        echo "Precio: ".$this->GetPrecio()."\n";
    }

    public static function VerificarProductoEnLista(array $listaProductos, Producto $nuevoProducto): bool {
        $retorno = false;        

        foreach($listaProductos as $producto) {
            if ($producto->GetCodigoBarra() == $nuevoProducto->GetCodigoBarra()) {
                echo "Error: El producto '".$nuevoProducto->GetNombre()."' con el código de barra:".$nuevoProducto->GetNombre().", ya existen en nuestro sistema.";
                $retorno = true;
                break;
            }else {
                echo "Exito! El nuevo producto '".$nuevoProducto->GetNombre()."' fue verificado y no está en nustro sitema.\n";
            }
        }
        return $retorno;
    }

    public function GuardarProductoJSON(string $archivoJson): bool {
        $retorno = false;

        $productos = [];
        if (file_exists($archivoJson)) {
            $productos = json_decode(file_get_contents($archivoJson), true) ?? [];
        }

        $productos[] = [
            'id' => $this->_id,
            'codigo_de_barra' => $this->_nombre,
            'nombre' => $this->_nombre,
            'tipo' => $this->_tipo,
            'stock' => $this->_stock,
            'precio' => $this->_precio
        ];

        if (file_put_contents($archivoJson, json_encode($productos, JSON_PRETTY_PRINT))) {
            $retorno = true;
        } else {
            echo "Error: No se pudo guardar en el archivo JSON: '$archivoJson'.\n";
        }

        return $retorno;
    }

    public static function CargarProductoDesdeJSON(string $archivoJson): array {
        $lista_productos_cargados = [];

        if (file_exists($archivoJson)) {
            $json = file_get_contents($archivoJson, true) ?? [];
            $datos = json_decode($json, true) ?? [];
            
            if ($datos) {
                foreach ($datos as $dato) {
                    $productos[] = new Producto(
                        $dato["codigo_de_barra"],
                        $dato["nombre"],
                        $dato["tipo"],
                        $dato["stock"],
                        $dato["precio"],
                        $dato["id"]
                    );
                }
                $lista_productos_cargados = $productos;
            }            
        }

        return $lista_productos_cargados;
    }
}