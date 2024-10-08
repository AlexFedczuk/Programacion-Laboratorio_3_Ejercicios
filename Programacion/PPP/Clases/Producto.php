<?php
require "./Clases/Archivo.php";

class Producto {
    private $id;
    private $titulo;
    private $precio;
    private $tipo;
    private $anoDeSalida;
    private $formato;
    private $stock;
    private $imagenPath;

    private static $tipos_validos = ["Videojuego", "Pelicula"];
    private static $formatos_validos = ["Digital", "Fisico"];

    public function __construct($titulo, $precio, $tipo, $anoDeSalida, $formato, $stock, $imagenPath, $id = null) {
        $this->id = $id;
        $this->titulo = $titulo;
        $this->precio = $precio;
        $this->tipo = $tipo;
        $this->anoDeSalida = $anoDeSalida;
        $this->formato = $formato;
        $this->stock = $stock;
        $this->imagenPath = $imagenPath;
    }

    public static function validarTipo($tipo) {
        return in_array($tipo, self::$tipos_validos);
    }

    public static function validarFormato($formato) {
        return in_array($formato, self::$formatos_validos);
    }

    public static function generarID($lista) {
        return count($lista) > 0 ? end($lista)["id"] + 1 : 1;
    }

    // Alta o actualizacin
    public static function guardarProducto($lista_productos, $producto, $jsonFile) {
        $producto_existente = false;

        foreach ($lista_productos as &$item) {
            if ($item["titulo"] == $producto->titulo && $item["tipo"] == $producto->tipo) {
                $item["precio"] = $producto->precio;
                $item["stock"] += $producto->stock;
                $producto_existente = true;
                break;
            }
        }

        if (!$producto_existente) {
            $producto->id = self::generarID($lista_productos);
            $nuevo_producto = [
                "id" => $producto->id,
                "titulo" => $producto->titulo,
                "precio" => $producto->precio,
                "tipo" => $producto->tipo,
                "anoDeSalida" => $producto->anoDeSalida,
                "formato" => $producto->formato,
                "stock" => $producto->stock,
                "imagen" => $producto->imagenPath
            ];
            $lista_productos[] = $nuevo_producto;
        }

        return Archivo::cargarArrayJSON($jsonFile, $lista_productos);
    }

    public function guardarImagen($imageDir) {
        if (!is_dir($imageDir)) {
            mkdir($imageDir, 0777, true);
            echo "ADVERTENCIA: El directorio '$imageDir' no existía. Se ha creado.\n";
        }

        $nombreImagen = $this->titulo . "_" . $this->tipo . ".jpg";
        $rutaImagen = $imageDir . $nombreImagen;

        return move_uploaded_file($this->imagenPath, $rutaImagen);
    }

    public function mostrarProducto() {
        echo "Titulo: " . $this->titulo . "\n";
        echo "Precio: " . $this->precio . "\n";
        echo "Tipo: " . $this->tipo . "\n";
        echo "Anio de salida: " . $this->anoDeSalida . "\n";
        echo "Formato: " . $this->formato . "\n";
        echo "Stock: " . $this->stock . "\n";
        echo "Imagen: " . $this->imagenPath . "\n";
    }

    public static function verificarProducto($lista_productos, $titulo, $tipo, $formato) {
        $tipoEncontrado = false;

        foreach ($lista_productos as $producto) {
            if ($producto["tipo"] == $tipo) {
                $tipoEncontrado = true;
                if ($producto["titulo"] == $titulo && $producto["formato"] == $formato) {
                    return "existe";
                }
            }
        }

        if (!$tipoEncontrado) {
            return "ERROR: No hay productos del tipo $tipo.\n";
        } else {
            return "ERROR: No hay productos con el titulo $titulo en el formato $formato.\n";
        }
    }
}