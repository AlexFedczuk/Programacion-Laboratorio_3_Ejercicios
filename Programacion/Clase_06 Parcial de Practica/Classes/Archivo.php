<?php
class Archivo{
    public static function DescargarArrayJSON(string $jsonFile){
        $result = [];
        if (file_exists($jsonFile)) {
            $result = json_decode(file_get_contents($jsonFile), true);
        } else {
            echo json_encode(['error' => 'ERROR: No se encontro el archivo de datos']);
            exit;
        }

        return $result;
    }

    public static function CargarArrayJSON(string $jsonFile, array $lista){
        $result = false;
        if (file_put_contents($jsonFile, json_encode($lista, JSON_PRETTY_PRINT))) {
            $result = true;
        }
        return $result;
    }
}