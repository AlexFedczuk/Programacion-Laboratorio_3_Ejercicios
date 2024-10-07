<?php
class Devolucion {
    private $db;
    private $devolucionesFile = "./Registros/devoluciones.json";
    private $cuponesFile = "./Registros/cupones.json";
    private $imageDir = "./ImagenesDeDevoluciones/2024/";

    public function __construct($db) {
        $this->db = $db;
    }

    public function registrarDevolucion($numeroPedido, $causa, $imagen) {
        // Verificar si el pedido existe
        if (!$this->verificarPedido($numeroPedido)) {
            echo "ERROR: No existe un pedido con el número $numeroPedido.\n";
            return false;
        }

        // Guardar la devolución en el archivo JSON
        $devolucion_id = $this->guardarDevolucion($numeroPedido, $causa);
        if (!$devolucion_id) {
            echo "ERROR: No se pudo registrar la devolución.\n";
            return false;
        }

        // Guardar la imagen del cliente enojado
        if (!$this->guardarImagen($imagen, $devolucion_id)) {
            echo "ERROR: No se pudo guardar la imagen.\n";
            return false;
        }

        // Generar un cupón de descuento
        if ($this->generarCupon($devolucion_id)) {
            echo "Devolución registrada y cupón creado exitosamente. Cupón ID: " . $devolucion_id . "\n";
            return true;
        } else {
            echo "ERROR: No se pudo generar el cupón.\n";
            return false;
        }
    }

    private function verificarPedido($numeroPedido) {
        $queryVerificar = "SELECT * FROM ventas WHERE numero_pedido = ?";
        $result = Database::Consultar($this->db, $queryVerificar, [$numeroPedido], "i");
        return count($result) > 0;
    }

    private function guardarDevolucion($numeroPedido, $causa) {
        $devoluciones = Archivo::DescargarArrayJSON($this->devolucionesFile);
        $devolucion_id = count($devoluciones) + 1;
        $devolucion = [
            'id' => $devolucion_id,
            'numero_pedido' => $numeroPedido,
            'causa' => $causa
        ];
        $devoluciones[] = $devolucion;

        if (file_put_contents($this->devolucionesFile, json_encode($devoluciones, JSON_PRETTY_PRINT))) {
            return $devolucion_id;
        } else {
            return false;
        }
    }

    private function guardarImagen($imagen, $devolucion_id) {
        if (!is_dir($this->imageDir)) {
            mkdir($this->imageDir, 0777, true);
            echo "ADVERTENCIA: El directorio '$this->imageDir' no existía y se creó.\n";
        }
        $imagenNombre = "devolucion_" . $devolucion_id . "_" . basename($imagen['name']);
        $rutaImagen = $this->imageDir . $imagenNombre;
        return move_uploaded_file($imagen['tmp_name'], $rutaImagen);
    }

    private function generarCupon($devolucion_id) {
        $cupones = Archivo::DescargarArrayJSON($this->cuponesFile);
        $cupon_id = count($cupones) + 1;
        $cupon = [
            'id' => $cupon_id,
            'devolucion_id' => $devolucion_id,
            'porcentajeDescuento' => 10,
            'estado' => 'no usado'
        ];
        $cupones[] = $cupon;
        return file_put_contents($this->cuponesFile, json_encode($cupones, JSON_PRETTY_PRINT));
    }
}