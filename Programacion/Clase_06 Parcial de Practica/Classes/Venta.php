<?php
require "./Classes/DataBase.php";

class Venta {
    private $id;
    private $email;
    private $sabor;
    private $tipo;
    private $vaso;
    private $cantidadVendida;
    private $numeroPedido;
    private $fecha;

    public function __construct(string $email, string $sabor, string $tipo, string $vaso, int $cantidadVendida, int $numeroPedido = null, string $fecha = "", int $id = null){
        $this->id = $id;
        $this->email = $email;
        $this->sabor = $sabor;
        $this->tipo = $tipo;
        $this->vaso = $vaso;
        $this->cantidadVendida = $cantidadVendida;
        $this->numeroPedido = $numeroPedido;
        $this->fecha = $fecha;
    }

    public function getId(): string {
        return $this->id ?? 0;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function getSabor(): string {
        return $this->sabor;
    }

    public function getTipo(): string {
        return $this->tipo;
    }

    public function getVaso(): string {
        return $this->vaso;
    }

    public function getCantidadVendida(): int {
        return $this->cantidadVendida;
    }

    public function getFecha(): string {
        return $this->fecha;
    }

    public function getNumeroPedido(): int {
        return $this->numeroPedido ?? 0;
    }

    public function setNumeroPedido(int $numeroPedido): void {
        $this->numeroPedido = $numeroPedido;
    }

    public function setFecha(string $fecha): void {
        $this->fecha = $fecha;
    }

    public static function VerificarEmail(string $email): bool {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    public static function VerificarPosibleVenta(array $lista_helados, Venta $venta): array {
        $heladoEncontrado = false;
        $stockSuficiente = false;

        foreach ($lista_helados as &$helado) {
            if ($helado['sabor'] == $venta->getSabor() && $helado['tipo'] == $venta->getTipo()) {
                $heladoEncontrado = true;
                if ($helado['stock'] >= $venta->getCantidadVendida()) {
                    $stockSuficiente = true;
                    $helado['stock'] -= $venta->getCantidadVendida();                    
                }
                break;
            }
        }

        return [$heladoEncontrado, $stockSuficiente, $lista_helados];
    }

    public static function CrearNombreImagenVenta(Venta $venta, string $usuario): string {
        return $venta->getSabor() . '_' . $venta->getTipo() . '_' . $venta->getVaso() . '_' . $usuario . '_' . date('Ymd_His') . '.jpg';
    }

    public function Mostrar(): void {
        echo "".$this->getId()."\n";
        echo "".$this->getEmail()."\n";
        echo "".$this->getSabor()."\n";
        echo "".$this->getTipo()."\n";
        echo "".$this->getVaso()."\n";
        echo "".$this->getCantidadVendida()."\n";
        echo "".$this->getNumeroPedido()."\n";
        echo "".$this->getFecha()."\n\n";
    }

    //soft-delete y mueve imagen.
    public static function borrarVenta($db, int $numeroPedido) {
        $backupImageDir = "./ImagenesBackupVentas/2024/";
        $imageDir = "./ImagenesDeVentas/2024/";
        $imagenNombre = "venta_" . $numeroPedido . ".jpg";
        $rutaImagen = $imageDir . $imagenNombre;

        $queryVerificar = "SELECT * FROM ventas WHERE numero_pedido = ?";
        $result = Database::Consultar($db, $queryVerificar, [$numeroPedido], "i");

        if (count($result) > 0) {
            $queryBorrar = "UPDATE ventas SET estado = 'eliminado' WHERE numero_pedido = ?";
            $actualizado = Database::Actualizar($db, $queryBorrar, [$numeroPedido], "i");

            if ($actualizado) {
                if (file_exists($rutaImagen)) {
                    if (!is_dir($backupImageDir)) {
                        mkdir($backupImageDir, 0777, true);
                        echo "ADVERTENCIA: El directorio de backup '$backupImageDir' no existía y se creó.\n";
                    }
                    if (rename($rutaImagen, $backupImageDir . $imagenNombre)) {
                        echo "Venta marcada como eliminada y la imagen se movió al backup.\n";
                    } else {
                        echo "ERROR: No se pudo mover la imagen al directorio de backup.\n";
                    }
                } else {
                    echo "ERROR: No se encontró la imagen asociada a la venta.\n";
                }
            } else {
                echo "ERROR: No se pudo eliminar la venta.\n";
            }
        } else {
            echo "ERROR: No existe una venta con el número $numeroPedido.\n";
        }
    }

    public static function ConsultarVentasPorDia($db, $fecha) {
        $query = "SELECT COUNT(*) as total FROM ventas WHERE DATE(fecha) = ?";
        $result = Database::Consultar($db, $query, [$fecha], "s");

        echo (count($result) > 0) 
            ? "RESPUESTA DE CONSULTA: Cantidad de ventas en el dia $fecha: " . $result[0]['total'] . "\n"
            : "RESPUESTA DE CONSULTA: No se encontraron ventas en el dia $fecha.\n";
    }

    public static function ConsultarVentasPorUsuario($db, $email) {
        $query = "SELECT * FROM ventas WHERE email = ?";
        $result = Database::Consultar($db, $query, [$email], "s");

        Database::MostrarResultados($result, "RESPUESTA DE CONSULTA: No se encontraron ventas para el usuario $email.", function($venta) {
            echo "RESPUESTA DE CONSULTA: Venta - Pedido: " . $venta['numero_pedido'] . ", Fecha: " . $venta['fecha'] . ", Sabor: " . $venta['sabor'] . ", Tipo: " . $venta['tipo'] . ", Cantidad: " . $venta['cantidad'] . "\n";
        });
    }

    public static function ConsultarVentasEntreFechas($db, $fechaInicio, $fechaFin) {
        $query = "SELECT * FROM ventas WHERE fecha BETWEEN ? AND ? ORDER BY email";
        $result = Database::Consultar($db, $query, [$fechaInicio, $fechaFin], "ss");

        Database::MostrarResultados($result, "RESPUESTA DE CONSULTA: No se encontraron ventas entre las fechas $fechaInicio y $fechaFin.", function($venta) {
            echo "RESPUESTA DE CONSULTA: Venta - Pedido: " . $venta['numero_pedido'] . ", Fecha: " . $venta['fecha'] . ", Sabor: " . $venta['sabor'] . ", Tipo: " . $venta['tipo'] . ", Cantidad: " . $venta['cantidad'] . "\n";
        });
    }

    public static function ConsultarVentasPorSabor($db, $sabor) {
        $query = "SELECT * FROM ventas WHERE sabor = ?";
        $result = Database::Consultar($db, $query, [$sabor], "s");

        Database::MostrarResultados($result, "RESPUESTA DE CONSULTA: No se encontraron ventas para el sabor $sabor.", function($venta) {
            echo "RESPUESTA DE CONSULTA: Venta - Pedido: " . $venta['numero_pedido'] . ", Fecha: " . $venta['fecha'] . ", Tipo: " . $venta['tipo'] . ", Cantidad: " . $venta['cantidad'] . "\n";
        });
    }

    public static function ConsultarVentasPorVasoCucurucho($db) {
        $query = "SELECT * FROM ventas WHERE tipo = 'Cucurucho'";
        $result = Database::Consultar($db, $query);

        Database::MostrarResultados($result, "RESPUESTA DE CONSULTA: No se encontraron ventas con vaso Cucurucho.", function($venta) {
            echo "RESPUESTA DE CONSULTA: Venta - Pedido: " . $venta['numero_pedido'] . ", Fecha: " . $venta['fecha'] . ", Sabor: " . $venta['sabor'] . ", Cantidad: " . $venta['cantidad'] . "\n";
        });
    }
}