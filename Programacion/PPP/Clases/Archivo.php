<?php
class Archivo{
    public static function descargarArrayJSON(string $jsonFile){
        $result = [];
        if (file_exists($jsonFile)) {
            $result = json_decode(file_get_contents($jsonFile), true);
        } else {
            echo "ERROR: No se encontro el archivo de datos.\n";
            exit;
        }

        return $result;
    }

    public static function cargarArrayJSON(string $jsonFile, array $lista){
        $result = false;
        if (file_put_contents($jsonFile, json_encode($lista, JSON_PRETTY_PRINT))) {
            $result = true;
        }
        return $result;
    }
}