<?php
/*
Aplicación No 7 (Mostrar impares)
Generar una aplicación que permita cargar los primeros 10 números impares en un Array.
Luego imprimir (utilizando la estructura for) cada uno en una línea distinta (recordar que el
salto de línea en HTML es la etiqueta <br/>). Repetir la impresión de los números
utilizando las estructuras while y foreach.
*/

$arrayImpares = [];

for ($i = 1, $contador = 0; $contador < 10; $i+= 2, $contador++) {
    $arrayImpares[$contador] = $i;
}

echo "Lista de los primeros 10 numeros impares: ";
for ($i = 0; $i < count($arrayImpares); $i++) {
    echo "\n".$arrayImpares[$i];
}

echo "\n\nLista de los primeros 10 numeros impares (con while): ";
$i = 0;
while ($i < count($arrayImpares)) {
    echo "\n".$arrayImpares[$i];
    $i++;
}

echo "\n\nLista de los primeros 10 numeros impares (con foreach): ";
foreach ($arrayImpares as $impar) {
    echo "\n".$impar;
}

?>