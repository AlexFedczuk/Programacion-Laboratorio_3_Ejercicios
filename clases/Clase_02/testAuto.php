<?php

$auto1 = new Auto("Toyota", "Rojo");
$auto2 = new Auto("Toyota", "Azul");
$auto3 = new Auto("Ford", "Negro", 20000);
$auto4 = new Auto("Ford", "Negro", 25000);
$auto5 = new Auto("Chevrolet", "Gris", 30000, new DateTime('2024-09-01'));

$auto3->AgregarImpuestos(1500);
$auto4->AgregarImpuestos(1500);
$auto5->AgregarImpuestos(1500);

$importeDouble = Auto::Add($auto1, $auto2);
echo "Importe sumado del primer y segundo auto: $" . $importeDouble . "\n";

echo $auto1->Equals($auto2) ? "El primer y segundo auto son iguales.\n" : "El primer y segundo auto son diferentes.\n";
echo $auto1->Equals($auto5) ? "El primer y quinto auto son iguales.\n" : "El primer y quinto auto son diferentes.\n";

$auto1->MostrarAuto();
echo "\n";
$auto3->MostrarAuto();
echo "\n";
$auto5->MostrarAuto();