<?php
//C:\xampp\htdocs\Programacion_3_Ejercicios/Programacion/Clase_03/testAuto.php

require_once 'ejercicio_19.php';

// Crear dos objetos “Auto” de la misma marca y distinto color.
$auto1 = new Auto("Toyota", "Rojo");
$auto2 = new Auto("Toyota", "Azul");

// Crear dos objetos “Auto” de la misma marca, mismo color y distinto precio.
$auto3 = new Auto("Ford", "Negro", 20000);
$auto4 = new Auto("Ford", "Negro", 25000);

// Crear un objeto “Auto” utilizando la sobrecarga restante (marca, color, precio y fecha).
$auto5 = new Auto("Chevrolet", "Gris", 30000, new DateTime("01-09-2024"));

// Utilizar el método “AgregarImpuesto” en los últimos tres objetos, agregando $1500 al atributo precio.
$auto3->AgregarImpuestos(1500);
$auto4->AgregarImpuestos(1500);
$auto5->AgregarImpuestos(1500);

// Obtener el importe sumado del primer objeto “Auto” más el segundo y mostrar el resultado.
$importeSumado = Auto::Add($auto1, $auto2);
echo "Importe sumado del primer y segundo auto: $" . number_format($importeSumado, 2) . "\n";

// Comparar el primer “Auto” con el segundo y quinto objeto e informar si son iguales o no.
echo $auto1->Equals($auto2) ? "El primer y segundo auto son iguales.\n" : "El primer y segundo auto son diferentes.\n";
echo $auto1->Equals($auto5) ? "El primer y quinto auto son iguales.\n" : "El primer y quinto auto son diferentes.\n";

// Utilizar el método de clase “MostrarAuto” para mostrar cada los objetos impares (1, 3, 5).
echo "\nAutos impares:\n";
Auto::MostrarAuto($auto1);
echo "\n";
Auto::MostrarAuto($auto2);
echo "\n";
Auto::MostrarAuto($auto3);

// Probar el método para guardar autos en el archivo autos.csv
echo "\nGuardando autos en un archivo .csv...\n";
$arrayAutos = [$auto1, $auto2, $auto3, $auto4, $auto5];
$archivo = "archivo_de_autos.csv";
foreach ($arrayAutos as $auto) {
    Auto::AltaAuto($auto, $archivo);
}

// Probar el método para leer autos desde el archivo autos.csv
echo "\nLeyendo autos desde el archivo '$archivo'...\n";
$autosLeidos = Auto::LeerAutos($archivo);
if ($autosLeidos == []) {
    echo "El archivo está vacio...\n";
}else{
    echo "Exito! El archivo ha sido leido exitósamente.\n";
}

echo "\nMostrando lo leido del archivo .csv: '$archivo'...\n";
foreach ($autosLeidos as $autoLeido) {
    Auto::MostrarAuto($autoLeido);
    echo "\n";
}