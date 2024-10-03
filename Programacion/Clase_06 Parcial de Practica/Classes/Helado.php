<?php

class Helado{
    private $id;
    private $sabor;
    private $precio;
    private $tipo;
    private $vaso;
    private $stock;
    private $imagen_path;

    public function __construct(string $sabor, float $precio, string $tipo, string $vaso, int $stock, string $imagen_path, int $id = null){
        $this->$id = $id;
        $this->$sabor = $sabor;
        $this->$precio = $precio;
        $this->$tipo = $tipo;
        $this->$vaso = $vaso;
        $this->$stock = $stock;
        $this->$imagen_path = $imagen_path;
    }

    public function getId(): int {
        return $this->id;
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

    public function getImagenPath(): string{
        return $this->imagen_path;
    }

    public static function VerificarTipo(string $tipo, array $tipos_validos): bool{
        if (in_array($tipo, $tipos_validos)) {
            return true;
        }else{
            return false;
        }
    }

    public static function VerificarVaso(string $vaso, array $vasos_validos): bool{
        if (in_array($vaso, $vasos_validos)) {
            return true;
        }else{
            return false;
        }
    }

    public static function GuardarImagenHelado(Helado $helado, string $imageDir): bool{
        $imagenNombre = $helado->getSabor() . '_' . $helado->getTipo() . '.jpg';
        $imagenPath = $imageDir . $imagenNombre;

        if (move_uploaded_file($helado->getImagenPath(), $imagenPath)) {
            return true;
        } else {
            return false;
        }
    }

    public static function GenerarID(array $lista): int{
        if($lista !== []){
            $id = count($lista) > 0 ? end($lista)['id'] + 1 : 1;
        }else{
            $id = 1;
        }        

        return $id;
    }

    public static function VerificarExistenciaHelado(array $lista, Helado $helado): bool{
        $result = false;
        foreach ($lista as &$item) {
            if ($item['sabor'] == $helado->getSabor() && $item['tipo'] == $helado->getTipo()) {
                $result = true;
                break;
            }
        }

        return $result;
    }

    public static function ActualizarHelado(array $lista, Helado $helado): bool{
        $result = false;
        foreach ($lista as &$item) {
            if ($item['sabor'] == $helado->getSabor() && $item['tipo'] == $helado->getTipo()) {
                $item['precio'] = $helado->getPrecio();
                $item['stock'] += $helado->getStock();
                $result = true;
                break;
            }
        }

        return $result;
    }

    public static function Alta(array $lista, Helado $helado): array{
        $helado = [
            'id' => $helado->getId(),
            'sabor' => $helado->getSabor(),
            'precio' => $helado->getPrecio(),
            'tipo' => $helado->getTipo(),
            'vaso' => $helado->getVaso(),
            'stock' => $helado->getStock(),
            'imagen' => $helado->getImagenPath()
        ];
        $lista[] = $helado;

        return $lista;
    }
}