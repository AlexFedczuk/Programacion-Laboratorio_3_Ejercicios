<?php

/*
Aplicación No 7 (Mostrar impares)
Generar una aplicación que permita cargar los primeros 10 números impares en un Array.
Luego imprimir (utilizando la estructura for) cada uno en una línea distinta (recordar que el
salto de línea en HTML es la etiqueta <br/>). Repetir la impresión de los números
utilizando las estructuras while y foreach.
*/

$arrayEnteros = [];


for ($i = 0; $i < 5; $i++) {
    $arrayEnteros[$i] = rand(0,10);
}

$total = array_sum($arrayEnteros);
$promedio = $total / count($arrayEnteros);

if ($promedio == 6) {
    echo "El promedio es igual a 6.";
}else if ($promedio < 6){
    echo "El promedio es menor a 6.";
}else {
    echo "El promedio es mayor a 6.";
}

echo "\nNumeros generados: " . implode(", ", $arrayEnteros);
