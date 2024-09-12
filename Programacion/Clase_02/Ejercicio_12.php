<?php
/*
Parte 3 - Ejercicios con Funciones

Aplicación No 12 (Invertir palabra)
Realizar el desarrollo de una función que reciba un Array de caracteres y que invierta el orden
de las letras del Array.
Ejemplo: Se recibe la palabra “HOLA” y luego queda “ALOH”.
*/

/**
 * Invierte el orden de los caracteres en un array.
 *
 * Esta función recibe un array de caracteres y retorna un nuevo array
 * donde los caracteres están en orden inverso.
 *
 * @param array $caracteres Array de caracteres a invertir.
 * @return array Retorna un nuevo array con los caracteres en orden inverso.
 * @throws InvalidArgumentException Si el parámetro no es un array o si el array contiene elementos no válidos.
 */
function invertirArray(array $arrayCaracteres): array {
    if (!is_array($arrayCaracteres)) {
        throw new InvalidArgumentException("Error: Se espera un array en el argumento.");
    }

    foreach ($arrayCaracteres as $caracter) {
        if (!is_string($caracter) || strlen($caracter) !== 1) {
            throw new InvalidArgumentException("Error: Cada elemento del array debe ser un caracter.");
        }
    }

    return array_reverse($arrayCaracteres);
}

$arrayOriginal = ['H', 'O', 'L', 'A'];
$arrayInvertida = invertirArray($arrayOriginal);

echo "Array original:". implode("",$arrayOriginal) ."\n";
echo "Array invertida:". implode("",$arrayInvertida) ."";