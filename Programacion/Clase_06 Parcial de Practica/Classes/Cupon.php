<?php
class Cupon {
    public static function AplicarCupon(string $codigo, array $cupones): array {
        foreach ($cupones as $cupon) {
            if ($cupon['codigo'] == $codigo && $cupon['estado'] == 'no usado') {
                return ['valido' => true, 'descuento' => $cupon['descuento']];
            }
        }
        return ['valido' => false];
    }

    public static function MarcarComoUsado(string $codigo, string $cuponesFile, array &$cupones): void {
        foreach ($cupones as &$cupon) {
            if ($cupon['codigo'] == $codigo) {
                $cupon['estado'] = 'usado';
                file_put_contents($cuponesFile, json_encode($cupones, JSON_PRETTY_PRINT));
                break;
            }
        }
    }
}