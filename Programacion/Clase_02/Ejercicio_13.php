<?php
/*
Aplicación No 13 (Invertir palabra)

Crear una función que reciba como parámetro un string ($palabra) y un entero ($max). La
función validará que la cantidad de caracteres que tiene $palabra no supere a $max y además
deberá determinar si ese valor se encuentra dentro del siguiente listado de palabras válidas:
“Recuperatorio”, “Parcial” y “Programacion”. Los valores de retorno serán: 1 si la palabra
pertenece a algún elemento del listado.
0 en caso contrario.
*/

/**
 * Verifica si una palabra es válida y no excede el número máximo de caracteres.
 *
 * La función recibe una palabra y un valor máximo de caracteres. Valida si la palabra pertenece
 * a una lista de palabras permitidas y si su longitud no excede el valor máximo.
 *
 * @param string $palabra La palabra a verificar.
 * @param int $max El número máximo permitido de caracteres.
 * @return int Retorna 1 si la palabra es válida y no excede el número máximo de caracteres, 0 en caso contrario.
 * @throws InvalidArgumentException Si los argumentos proporcionados no son válidos.
 */
function validarStringLen(string $palabra, int $max): int {
    $retorno = 0;

    if (!is_string($palabra) || !is_int($max)) {
        throw new InvalidArgumentException("Error: Se espera un 'string' y un 'int' en los argumentos.");
        //echo "Error: Se espera un 'string' y un 'int' en los argumentos.\n";
    }

    if (strlen($palabra) > $max) {
        throw new InvalidArgumentException("Error: La 'Palabra' supera el máximo de caracteres.\n");
        //echo "Error: La 'Palabra'supera el máximo de caracteres. \n";
    } else {
        $palabrasValidas = ["Recuperatorio", "Parcial", "Programacion"];
        
        if (in_array($palabra, $palabrasValidas)) {
            $retorno = 1;
        }
    }

    return $retorno;
}

$palabra1 = 1234; // Parece que PhP transforma automaticamente (si es que puede) el int a string: "1234".
$max1 = 10;
echo validarStringLen($palabra1, $max1). "\n";

$palabra2 = "Examen";
$max2 = 10;
echo validarStringLen($palabra2, $max2). "\n";

$palabra3 = "Programacion";
$max3 = 5;
echo validarStringLen($palabra3, $max3);