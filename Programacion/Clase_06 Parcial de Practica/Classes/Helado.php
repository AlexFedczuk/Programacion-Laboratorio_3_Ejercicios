<?php

class Helado{
    private $sabor;
    private $precio;
    private $tipo;
    private $vaso;
    private $stock;
    private $imagen_path;

    public function __construct(string $sabor, float $precio, string $tipo, string $vaso, int $stock, string $imagen_path = ""){
        $this->$sabor = $sabor;
        $this->$precio = $precio;
        $this->$tipo = $tipo;
        $this->$vaso = $vaso;
        $this->$stock = $stock;
        $this->$imagen_path = $imagen_path;
    }

    public function SetImagenPath(string $imagen_path): void{
        $this->imagen_path = $imagen_path;
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

    public static function GuardarImagen($imagen, string $sabor, string $tipo, string $imageDir): bool{
        $imagenNombre = $sabor . '_' . $tipo . '.jpg';
        $imagenPath = $imageDir . $imagenNombre;

        // Guardar la imagen en el directorio de imágenes
        if (move_uploaded_file($imagen['tmp_name'], $imagenPath)) {
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

    public static function VerificarExistenciaHelado(array $lista, string $sabor, string $tipo): bool{
        $result = false;
        foreach ($lista as &$item) {
            if ($item['sabor'] == $sabor && $item['tipo'] == $tipo) {
                $result = true;
                break;
            }
        }

        return $result;
    }

    public static function ActualizarHelado(array $lista, string $sabor, string $tipo, string $precio, string $stock): bool{
        $result = false;
        foreach ($lista as &$item) {
            if ($item['sabor'] == $sabor && $item['tipo'] == $tipo) {
                $item['precio'] = $precio;
                $item['stock'] += $stock;
                $result = true;
                break;
            }
        }

        return $result;
    }
}