<?php

/*
Aplicación No° 2 (Mostrar fecha y estación)

Obtenga la fecha actual del servidor (función date) y luego imprímala dentro de la página con
distintos formatos (seleccione los formatos que más le guste). Además indicar que estación del
año es. Utilizar una estructura selectiva múltiple. 
*/

$fecha_actual_díaMesAnio = date("d-m-Y"); //Formato Año-Mes-Dia.
$fecha_actual_anioMesDia = date("Y-m-d"); //Formato Día-Mes-Año.
$fecha_actual_masHora = date("d-m-Y H:i:s"); //Formato Año-Mes-Dia mas la hora.
$fecha_actual_escrito = date("l, F j, Y"); //Formato Año-Mes-Dia mas la hora.
$mes_actual = date("n");
$dia_actual = date("j");
$estacion = "";

echo "La fecha de hoy (Día-Mes-Año): ".$fecha_actual_díaMesAnio."\n";
echo "La fecha de hoy (Año-Mes-Día): ".$fecha_actual_anioMesDia."\n";
echo "La fecha de hoy mas la hora (Día-Mes-Año): ".$fecha_actual_masHora."\n";
echo "La fecha de hoy (escrita): ".$fecha_actual_escrito."\n";

switch ($mes_actual) {
    case 1:
    case 2:
        $estacion = "Verano";
        break;   
    case 3:
        $estacion = ($dia < 21) ? "Verano" : "Otoño";
        break;
    case 4:
    case 5:
        $estacion = "Otoño";
        break;
    case 6:    
        $estacion = ($dia < 21) ? "Otoño" : "Invierno";
        break;
    case 7:
    case 8:
        $estacion = "Invierno";
        break;
    case 9:
        $estacion = ($dia < 21) ? "Invierno" : "Primavera";
    case 10:
    case 11:
        $estacion = "Primavera";
        break;
    case 12:
        $estacion = ($dia < 21) ? "Primavera" : "Verano";
        break;
    default:
        break;      
}

echo "Estamos en la estacion: ". $estacion;