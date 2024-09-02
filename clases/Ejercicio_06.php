<?php

/*
Aplicación No 6 (Carga aleatoria)
Definir un Array de 5 elementos enteros y asignar a cada uno de ellos un número (utilizar la
función rand). Mediante una estructura condicional, determinar si el promedio de los números
son mayores, menores o iguales que 6. Mostrar un mensaje por pantalla informando el
resultado.
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
