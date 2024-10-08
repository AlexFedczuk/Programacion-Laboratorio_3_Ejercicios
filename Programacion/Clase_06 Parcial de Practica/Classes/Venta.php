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
    private $importeFinal;
    private $descuento;

    public function __construct(
        string $email,
        string $sabor,
        string $tipo,
        string $vaso,
        int $cantidadVendida,
        int $numeroPedido = null,
        string $fecha = "",
        float $importeFinal = 0,
        float $descuento = 0,
        int $id = null
    ) {
        $this->id = $id;
        $this->email = $email;
        $this->sabor = $sabor;
        $this->tipo = $tipo;
        $this->vaso = $vaso;
        $this->cantidadVendida = $cantidadVendida;
        $this->numeroPedido = $numeroPedido;
        $this->fecha = $fecha;
        $this->importeFinal = $importeFinal;
        $this->descuento = $descuento;
    }

    public function getId(): int {
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

    public function getImporteFinal(): float {
        return $this->importeFinal;
    }

    public function getDescuento(): float {
        return $this->descuento;
    }

    public function setNumeroPedido(int $numeroPedido): void {
        $this->numeroPedido = $numeroPedido;
    }

    public function setFecha(string $fecha): void {
        $this->fecha = $fecha;
    }

    public function setImporteFinal(float $importeFinal): void {
        $this->importeFinal = $importeFinal;
    }

    public function setDescuento(float $descuento): void {
        $this->descuento = $descuento;
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
        echo "ID: " . $this->getId() . "\n";
        echo "Email: " . $this->getEmail() . "\n";
        echo "Sabor: " . $this->getSabor() . "\n";
        echo "Tipo: " . $this->getTipo() . "\n";
        echo "Vaso: " . $this->getVaso() . "\n";
        echo "Cantidad Vendida: " . $this->getCantidadVendida() . "\n";
        echo "Número Pedido: " . $this->getNumeroPedido() . "\n";
        echo "Fecha: " . $this->getFecha() . "\n";
        echo "Importe Final: " . $this->getImporteFinal() . "\n";
        echo "Descuento: " . $this->getDescuento() . "%\n";
    }

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
}