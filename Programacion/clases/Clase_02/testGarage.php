<?php

require_once 'Ejercicio_18.php';

$auto1 = new Auto("Toyota", "Rojo");
$auto2 = new Auto("Toyota", "Azul");
$auto3 = new Auto("Ford", "Negro", 20000);
$auto4 = new Auto("Chevrolet", "Gris", 30000);

$miGarage = new Garage("Garage Central", 10.0);

$miGarage->Add($auto1);
$miGarage->Add($auto2);
$miGarage->Add($auto3);

$miGarage->Add($auto1);

$miGarage->MostrarGarage();

$miGarage->Remove($auto2);

$miGarage->Remove($auto2);

$miGarage->MostrarGarage();
