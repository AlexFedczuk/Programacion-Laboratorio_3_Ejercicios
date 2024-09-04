<?php
/*
Aplicación No 10 (Arrays de Arrays)
Realizar las líneas de código necesarias para generar un Array asociativo y otro indexado que
contengan como elementos tres Arrays del punto anterior cada uno. Crear, cargar y mostrar los
Arrays de Arrays.
*/
$lapicera1 = [
    'color' => 'Azul',
    'marca' => 'Bic',
    'trazo' => 'Fino',
    'precio' => 50
];

$lapicera2 = [
    'color' => 'Negro',
    'marca' => 'Pilot',
    'trazo' => 'Medio',
    'precio' => 120
];

$lapicera3 = [
    'color' => 'Rojo',
    'marca' => 'Faber-Castell',
    'trazo' => 'Grueso',
    'precio' => 85
];

$arrayAsociativo = [
    'lapicera1' => $lapicera1,
    'lapicera2' => $lapicera2,
    'lapicera3' => $lapicera3
];

$arrayIndexado = [$lapicera1, $lapicera2, $lapicera3];

echo "\n*** El array indexado ***\n";
foreach ($arrayIndexado as $indice => $lapicera) {
    echo "\nDetalle de la lapicera: ". $indice + 1 ."°\n";
    foreach ($lapicera as $propiedad => $valor) {
        echo ucfirst(strtolower($propiedad)).": ". $valor ."\n";
    }
}

echo "\n*** El array asociativo ***\n";
foreach ($arrayAsociativo as $nombreVariable => $lapicera) {
    echo "\nDetalle de la ". $nombreVariable .":\n";
    foreach ($lapicera as $propiedad => $valor) {
        echo ucfirst(strtolower($propiedad)).": ". $valor ."\n";
    }
}