<?php
/*
Aplicación No 9 (Arrays asociativos)
Realizar las líneas de código necesarias para generar un Array asociativo $lapicera, que
contenga como elementos: ‘color’, ‘marca’, ‘trazo’ y ‘precio’. Crear, cargar y mostrar tres
lapiceras.
*/

$lapicera1 = [
    'color' => 'Azul',
    'marca' => 'Bic',
    'trazo' => 'Fino',
    'precio' => 100
];

$lapicera2 = [
    'color' => 'Negro',
    'mArca' => 'Pilot',
    'trazo' => 'Medio',
    'precio' => 200
];

$lapicera3 = [
    'color' => 'Rojo',
    'marca' => 'Faber-Castell',
    'trAzo' => 'Grueso',
    'precio' => 300
];

$lapiceras = [$lapicera1, $lapicera2, $lapicera3];

foreach ($lapiceras as $indice => $lapicera) {
    echo "\nDetalle de la lapicera: ". $indice + 1 ."°\n";
    foreach ($lapicera as $propiedad => $valor) {
        echo ucfirst(strtolower($propiedad)).": ". $valor ."\n";
    }
}