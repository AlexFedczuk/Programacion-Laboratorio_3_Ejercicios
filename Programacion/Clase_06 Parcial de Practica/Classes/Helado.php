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
        $this->id = $id;
        $this->sabor = $sabor;
        $this->precio = $precio;
        $this->tipo = $tipo;
        $this->vaso = $vaso;
        $this->stock = $stock;
        $this->imagen_path = $imagen_path;
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
        $result = false;
        if (!is_dir($imageDir)) {
            mkdir($imageDir, 0777, true);     
        }

        $imagenNombre = $helado->getSabor() . '_' . $helado->getTipo() . '.jpg';
        $imagenPath = $imageDir . $imagenNombre;

        if (move_uploaded_file($helado->getImagenPath(), $imagenPath)) {
            $result = true;
        }
        
        return $result;
    }

    public static function GenerarID($lista): int{
        if($lista == []){
            $id = 1;
        }else{
            $id = count($lista) > 0 ? end($lista)['id'] + 1 : 1;   
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

    public static function ActualizarHelado(array $lista, Helado $helado): array{
        $result = [];
        
        foreach ($lista as &$item) {
            if ($item['sabor'] == $helado->getSabor() && $item['tipo'] == $helado->getTipo()) {
                $item['precio'] = $helado->getPrecio();
                $item['stock'] += $helado->getStock();
                $result = true;
                break;
            }
        }
        $result = $lista;

        return $result;
    }

    public static function Alta($lista, Helado $helado): array{
        echo $helado;
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

    public static function VerificarExistenciaSaborYTipo(array $lista_helados, string $sabor_ingresado, string $tipo_ingresado): void {
        $saborEncontrado = false;
        $tipoEncontrado = false;

        foreach($lista_helados as $helado) {
            if ($helado['sabor'] == $sabor_ingresado) {
                $saborEncontrado = true;
                if ($helado['tipo'] == $tipo_ingresado) {
                    // Si coinciden el sabor y el tipo, retornamos "existe"
                    // $tipoEncontrado = true; Lo comento porque termina siendo redundante, ya que si existe, no va a ser necesario cambiar el estado de la variable.
                    echo json_encode(['message' => 'existe']);
                    exit;
                }
            }
        }

        // Si no encontramos el sabor y tipo juntos, informamos el resultado
        if (!$saborEncontrado) {
            echo "ERROR: El sabor no existe.\n";
        } elseif ($saborEncontrado && !$tipoEncontrado) {
            echo "ERROR: El tipo no coincide con el sabor.\n";
        }
    }

    public function Mostrar(): void {
        //echo "".$this->getId()."\n";
        echo "".$this->getSabor()."\n";
        echo "".$this->getPrecio()."\n";
        echo "".$this->getTipo()."\n";
        echo "".$this->getVaso()."\n";
        echo "".$this->getStock()."\n";
        echo "".$this->getImagenPath()."\n";
    }
    
    public function __toString() {
        return "Helado: Sabor={".$this->getSabor()."}, Precio={$this->precio}, Tipo={$this->tipo}, Vaso={$this->vaso}, Stock={$this->stock}, Imagen={$this->imagen_path}";
    }
}