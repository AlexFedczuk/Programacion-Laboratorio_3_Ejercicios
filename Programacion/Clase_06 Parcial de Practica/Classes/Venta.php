<?php

use LDAP\Result;

class Venta{
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
        if($this->id){
            return $this->id;
        }else{
            return 0;
        }        
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
        if($this->numeroPedido){
            return $this->numeroPedido;
        }else{
            return 0;
        }
    }

    public function setNumeroPedido(int $numeroPedido): void {
        $this->numeroPedido = $numeroPedido;
    }

    public function setFecha(string $fecha): void {
        $this->fecha = $fecha;
    }

    public function setUsuario(string $usuario): void {
        $this->$usuario = $usuario;
    }

    public static function VerificarEmail(string $email): bool {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }

    public static function VerificarPosibleVenta(array $lista_helados, Venta $venta): array {
        $heladoEncontrado = false;
        $stockSuficiente = false;
        $result = [];

        foreach ($lista_helados as &$helado) {
            if ($helado['sabor'] == $venta->getSabor() && $helado['tipo'] == $venta->getTipo()) {
                $heladoEncontrado = true;
                if ($helado['stock'] >= $venta->getCantidadVendida()) {
                    $stockSuficiente = true;
                    // Actualizo el stock. Descuento la cantidad pedida del stock.
                    $helado['stock'] -= $venta->getCantidadVendida();                    
                }
                break;
            }
        }

        $result = [$heladoEncontrado, $stockSuficiente, $lista_helados];

        return $result;
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
}