<?php

/*
Aplicación No 4 (Calculadora)
Escribir un programa que use la variable $operador que pueda almacenar los símbolos
matemáticos: ‘+’, ‘-’, ‘/’ y ‘*’; y definir dos variables enteras $op1 y $op2. De acuerdo al
símbolo que tenga la variable $operador, deberá realizarse la operación indicada y mostrarse el
resultado por pantalla.
*/
$operador = "/";
$op1 = 10;
$op2 = 0;
$resultado = null;

switch ($operador) {
    case "+":
        $resultado = $op1 + $op2;
        echo "El resultado de $op1 + $op2 es: $resultado";
        break;
    case "-":
        $resultado = $op1 - $op2;
        echo "El resultado de $op1 - $op2 es: $resultado";
        break;
    case "/":
        if ($op2 != 0) {
            $resultado = $op1 / $op2;
            echo "El resultado de $op1 / $op2 es: $resultado";
        }else {
            echo "Error: Division por cero no esta permitida.";
        }
        break;
    case "*":
        $resultado = $op1 * $op2;
        echo "El resultado de $op1 * $op2 es: $resultado";
        break;
    default:
        echo "Operador no valido";    
}
