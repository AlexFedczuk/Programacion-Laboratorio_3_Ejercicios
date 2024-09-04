<?php

/* Aplicación No° 1 (Sumar números)
Confeccionar un programa que sume todos los números enteros desde 1 mientras la suma no
supere a 1000. Mostrar los números sumados y al finalizar el proceso indicar cuantos números
se sumaron. */

$suma_total = 0;
$contador = 0;
$limite = 1000;

for ($i = 1; $i < $limite; $i++) {
    if ($suma_total + $i > $limite) {
        break;
    }

    $suma_total += $i;
    $contador++;

    echo "Numero sumado: $i\n";
}

echo "Cantidad de numeros sumados: $contador\n";
echo "Suma total: $suma_total\n";
?>
