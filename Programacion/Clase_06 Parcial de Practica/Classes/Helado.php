<?php

class Helado {
    private $id;
    private $sabor;
    private $precio;
    private $tipo;
    private $vaso;
    private $stock;
    private $imagen_path;

    public function __construct(string $sabor, float $precio, string $tipo, string $vaso, int $stock, string $imagen_path, int $id = null) {
        $this->id = $id;
        $this->sabor = $sabor;
        $this->precio = $precio;
        $this->tipo = $tipo;
        $this->vaso = $vaso;
        $this->stock = $stock;
        $this->imagen_path = $imagen_path;
    }

    public function getId(): int {
        return $this->id ?? 0;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function getSabor(): string {
        return $this->sabor;
    }

    public function getPrecio(): float {
        return $this->precio;
    }

    public function getTipo(): string {
        return $this->tipo;
    }

    public function getVaso(): string {
        return $this->vaso;
    }

    public function getStock(): int {
        return $this->stock;
    }

    public function getImagenPath(): string {
        return $this->imagen_path;
    }

    public static function VerificarTipo(string $tipo, array $tipos_validos): bool {
        return in_array($tipo, $tipos_validos);
    }

    public static function VerificarVaso(string $vaso, array $vasos_validos): bool {
        return in_array($vaso, $vasos_validos);
    }

    public static function GuardarImagenHelado(Helado $helado, string $imageDir): bool {
        if (!is_dir($imageDir)) {
            mkdir($imageDir, 0777, true);
        }

        $imagenNombre = $helado->getSabor() . '_' . $helado->getTipo() . '.jpg';
        $imagenPath = $imageDir . $imagenNombre;

        return move_uploaded_file($helado->getImagenPath(), $imagenPath);
    }

    public static function GenerarID(array $lista): int {
        return empty($lista) ? 1 : end($lista)['id'] + 1;
    }

    public static function VerificarExistenciaHelado(array $lista, Helado $helado): bool {
        foreach ($lista as $item) {
            if ($item['sabor'] == $helado->getSabor() && $item['tipo'] == $helado->getTipo()) {
                return true;
            }
        }
        return false;
    }

    public static function ActualizarHelado(array $lista, Helado $helado): array {
        foreach ($lista as &$item) {
            if ($item['sabor'] == $helado->getSabor() && $item['tipo'] == $helado->getTipo()) {
                $item['precio'] = $helado->getPrecio();
                $item['stock'] += $helado->getStock();
                break;
            }
        }
        return $lista;
    }

    public static function Alta(array $lista, Helado $helado): array {
        $nuevoHelado = [
            'id' => $helado->getId(),
            'sabor' => $helado->getSabor(),
            'precio' => $helado->getPrecio(),
            'tipo' => $helado->getTipo(),
            'vaso' => $helado->getVaso(),
            'stock' => $helado->getStock(),
            'imagen' => $helado->getImagenPath()
        ];
        $lista[] = $nuevoHelado;
        return $lista;
    }

    public static function VerificarExistenciaSaborYTipo(array $lista_helados, string $sabor_ingresado, string $tipo_ingresado): void {
        foreach ($lista_helados as $helado) {
            if ($helado['sabor'] == $sabor_ingresado && $helado['tipo'] == $tipo_ingresado) {
                echo json_encode(['message' => 'existe']);
                exit;
            }
        }

        echo "ERROR: No se encontró el sabor o el tipo especificado.\n";
    }

    public function Mostrar(): void {
        echo $this->getSabor() . "\n";
        echo $this->getPrecio() . "\n";
        echo $this->getTipo() . "\n";
        echo $this->getVaso() . "\n";
        echo $this->getStock() . "\n";
        echo $this->getImagenPath() . "\n";
    }

    public function __toString() {
        return "Helado: Sabor={$this->sabor}, Precio={$this->precio}, Tipo={$this->tipo}, Vaso={$this->vaso}, Stock={$this->stock}, Imagen={$this->imagen_path}";
    }

    public static function getPrecioFromLista(array $lista_helados, string $sabor, string $tipo) {
        $precioHelado = 0;
        foreach ($lista_helados as $helado) {
            if ($helado['sabor'] == $sabor && $helado['tipo'] == $tipo) {
                $precioHelado = $helado['precio'];
                break;
            }
        }

        return $precioHelado;
    }
}