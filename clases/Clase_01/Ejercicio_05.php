<?php

/*
Aplicación No 5 (Números en letras)
Realizar un programa que en base al valor numérico de una variable $num, pueda mostrarse
por pantalla, el nombre del número que tenga dentro escrito con palabras, para los números
entre el 20 y el 60.
Por ejemplo, si $num = 43 debe mostrarse por pantalla “cuarenta y tres”.
*/
$num = 23;

if ($num < 20 || $num > 60) {
    echo "Error: El numero esta fuera del rango permitido.";
}else {
    $decenas = [
        20 => "veinte",
        30 => "treinta",
        40 => "cuarenta",
        50 => "cincuenta",
        60 => "sesenta"
    ];
    $unidades = [
        1 => "uno",
        2 => "dos",
        3 => "tres",
        4 => "cuatro",
        5 => "cinco",
        6 => "seis",
        7 => "siete",
        8 => "ocho",
        9 => "nueve"
    ];

    if ($num % 10 == 0) {
        echo $decenas[$num];
    }else {
        $parteDecenas = floor($num / 10) * 10;
        $parteUnidades = $num % 10;

        if ($parteDecenas == 20) {
            // Manejar caso especial de "veintiuno", "veintidós", etc.
            echo "veinti" . $unidades[$parteUnidades];
        } else {
            echo $decenas[$parteDecenas] . " y " . $unidades[$parteUnidades];
        }
    }
}
