<?php
require "./Clases/Archivo.php";

class Venta {
    private $id;
    private $email;
    private $titulo;
    private $tipo;
    private $formato;
    private $cantidad;
    private $numeroPedido;
    private $fecha;

    public function __construct($email, $titulo, $tipo, $formato, $cantidad, $numeroPedido = null, $fecha = "") {
        $this->email = $email;
        $this->titulo = $titulo;
        $this->tipo = $tipo;
        $this->formato = $formato;
        $this->cantidad = $cantidad;
        $this->numeroPedido = $numeroPedido ?? rand(1000, 9999);
        $this->fecha = $fecha ?: date('Y-m-d H:i:s');
    }

    public function getId() {
        return $this->id;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getTitulo() {
        return $this->titulo;
    }

    public function getTipo() {
        return $this->tipo;
    }

    public function getFormato() {
        return $this->formato;
    }

    public function getCantidad() {
        return $this->cantidad;
    }

    public function getNumeroPedido() {
        return $this->numeroPedido;
    }

    public function getFecha() {
        return $this->fecha;
    }

    public function mostrarVenta() {
        echo "Venta:\n";
        echo "Email: " . $this->email . "\n";
        echo "Titulo: " . $this->titulo . "\n";
        echo "Tipo: " . $this->tipo . "\n";
        echo "Formato: " . $this->formato . "\n";
        echo "Cantidad: " . $this->cantidad . "\n";
        echo "Numero de Pedido: " . $this->numeroPedido . "\n";
        echo "Fecha: " . $this->fecha . "\n";
    }

    public static function verificarStock($lista_productos, $venta) {
        foreach ($lista_productos as &$producto) {
            if ($producto["titulo"] == $venta->getTitulo() && $producto["tipo"] == $venta->getTipo() && $producto["formato"] == $venta->getFormato()) {
                if ($producto["stock"] >= $venta->getCantidad()) {
                    // Descuenta la cantidad vendida del stock.
                    $producto["stock"] -= $venta->getCantidad();
                    return [true, $lista_productos];
                } else {
                    // Si no se encuentra el stock suficiente, se retorna false.
                    return [false, $lista_productos];
                }
            }
        }
        // Si no se encuentra el producto en la lista, se retorna false.
        return [false, $lista_productos];
    }

    public static function registrarVenta($jsonFile, $venta, $imagenPath) {
        $lista_ventas = Archivo::DescargarArrayJSON($jsonFile);

        $id = count($lista_ventas) > 0 ? end($lista_ventas)["id"] + 1 : 1;

        $nueva_venta = [
            "id" => $id,
            "email" => $venta->getEmail(),
            "titulo" => $venta->getTitulo(),
            "tipo" => $venta->getTipo(),
            "formato" => $venta->getFormato(),
            "cantidad" => $venta->getCantidad(),
            "numeroPedido" => $venta->getNumeroPedido(),
            "fecha" => $venta->getFecha(),
            "imagen" => $imagenPath
        ];

        $lista_ventas[] = $nueva_venta;

        return Archivo::CargarArrayJSON($jsonFile, $lista_ventas);
    }

    public static function generarNombreImagenVenta($titulo, $tipo, $formato, $email) {
        $usuario = explode('@', $email)[0];
        return $titulo . "_" . $tipo . "_" . $formato . "_" . $usuario . "_" . date('Ymd_His') . ".jpg";
    }

    public static function consultarVentasPorDia($lista_ventas, $fecha) {
        $cantidad = 0;

        foreach ($lista_ventas as $venta) {
            if (strpos($venta['fecha'], $fecha) !== false) {
                $cantidad += $venta['cantidad'];
            }
        }

        echo "Cantidad de productos vendidos en la fecha $fecha: $cantidad\n";
    }

    public static function consultarVentasPorUsuario($lista_ventas, $email) {
        foreach ($lista_ventas as $venta) {
            if ($venta["email"] == $email) {
                echo "Venta - Titulo: " . $venta['titulo'] . ", Cantidad: " . $venta['cantidad'] . ", Fecha: " . $venta['fecha'] . "\n";
            }
        }
    }

    public static function consultarVentasPorTipo($lista_ventas, $tipo) {
        foreach ($lista_ventas as $venta) {
            if ($venta["tipo"] == $tipo) {
                echo "Venta - Titulo: " . $venta['titulo'] . ", Cantidad: " . $venta['cantidad'] . ", Fecha: " . $venta['fecha'] . "\n";
            }
        }
    }

    public static function consultarProductosPorRangoDePrecio($lista_ventas, $precioMin, $precioMax) {
        foreach ($lista_ventas as $venta) {
            if ($venta['precio'] >= $precioMin && $venta['precio'] <= $precioMax) {
                echo "Producto: " . $venta['titulo'] . ", Precio: " . $venta["precio"] . "\n";
            }
        }
    }

    public static function consultarProductosPorAnio($lista_ventas) {
        usort($lista_ventas, function($a, $b) {
            return $a["anioDeSalida"] - $b["anioDeSalida"];
        });

        foreach ($lista_ventas as $venta) {
            echo "Producto: " . $venta['titulo'] . ", Año de Salida: " . $venta["anioDeSalida"] . "\n";
        }
    }

    public static function consultarProductoMasVendido($lista_ventas) {
        $productosVendidos = [];

        foreach ($lista_ventas as $venta) {
            $titulo = $venta['titulo'];
            if (isset($productosVendidos[$titulo])) {
                $productosVendidos[$titulo] += $venta['cantidad'];
            } else {
                $productosVendidos[$titulo] = $venta['cantidad'];
            }
        }

        // Buscar el producto con más unidades vendidas
        $productoMasVendido = "";
        $maxVendidas = 0;

        foreach ($productosVendidos as $producto => $cantidad) {
            if ($cantidad > $maxVendidas) {
                $maxVendidas = $cantidad;
                $productoMasVendido = $producto;
            }
        }

        echo "El producto más vendido es: $productoMasVendido con $maxVendidas unidades vendidas.\n";
    }

    public static function modificarVenta($numeroPedido, $email, $titulo, $tipo, $formato, $cantidad, &$lista_ventas) {
        foreach ($lista_ventas as &$venta) {
            if ($venta['numeroPedido'] == $numeroPedido) {
                $venta['email'] = $email;
                $venta['titulo'] = $titulo;
                $venta['tipo'] = $tipo;
                $venta['formato'] = $formato;
                $venta['cantidad'] = $cantidad;
                return true;
            }
        }
        return false;
    }

    public static function borrarVenta($numeroPedido, &$lista_ventas, $imageDir, $backupImageDir) {
        foreach ($lista_ventas as &$venta) {
            if ($venta['numeroPedido'] == $numeroPedido) {
                $venta['estado'] = 'eliminado';

                $imagenNombre = "venta_" . $numeroPedido . ".jpg";
                $rutaImagen = $imageDir . $imagenNombre;

                if (file_exists($rutaImagen)) {
                    if (!is_dir($backupImageDir)) {
                        mkdir($backupImageDir, 0777, true);
                        echo "ADVERTENCIA: El directorio de backup '$backupImageDir' no existia y se creo.\n";
                    }

                    if (rename($rutaImagen, $backupImageDir . $imagenNombre)) {
                        echo "Imagen movida al directorio de backup.\n";
                    } else {
                        echo "ERROR: No se pudo mover la imagen al directorio de backup.\n";
                    }
                } else {
                    echo "ERROR: No se encontro la imagen asociada a la venta.\n";
                }

                return true;
            }
        }
        return false;
    }
}
