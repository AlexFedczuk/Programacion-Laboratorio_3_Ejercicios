<?php
// Incluir las clases necesarias
include 'ejercicio_20.php';

// Función para realizar pruebas
function runTests(): void {
    // Crear instancias de Auto
    $auto1 = new Auto('Toyota', 'Rojo', 15000.55, new DateTime('2023-03-15'));
    $auto2 = new Auto('Honda', 'Azul', 12000.45, new DateTime('2022-06-10'));
    $auto3 = new Auto('Toyota', 'Rojo', 15500.34, new DateTime('2023-08-22'));

    // Crear instancia de Garage
    $garage = new Garage('Garage Central', 20.3, [$auto1, $auto2]);

    // Probar métodos Setters y Getters
    echo "Prueba de Setters y Getters:\n";
    echo $garage->GetRazonSocial() . "\n"; // Esperado: 'Garage Central'
    echo $garage->GetPrecioPorHora() . "\n"; // Esperado: 20.0

    $garage->SetRazonSocial('Garage Norte');
    $garage->SetPrecioPorHora(25.99);

    echo $garage->GetRazonSocial() . "\n"; // Esperado: 'Garage Norte'
    echo $garage->GetPrecioPorHora() . "\n"; // Esperado: 25.0

    // Probar métodos Add y Remove
    echo "\nPrueba de Add y Remove:\n";
    $garage->Add($auto3); // Esperado: 'Éxito: Auto agregado al garage!'
    $garage->Add($auto1); // Esperado: 'Error: El auto ya está en el garage.'

    $garage->Remove($auto2); // Esperado: 'Éxito: Auto eliminado del garage!'
    $garage->Remove($auto2); // Esperado: 'Error: El auto no está en el garage.'

    // Mostrar Garage
    echo "\nMostrar Garage:\n";
    $garage->MostrarGarage();

    // Probar AltaGarage y LeerGarages
    echo "\nPrueba de AltaGarage y LeerGarages:\n";
    $archivo = "archivo_de_garages.csv";
    Garage::AltaGarage($garage, $archivo);

    $garagesLeidos = Garage::LeerGarages($archivo);
    foreach ($garagesLeidos as $garageLeido) {
        $garageLeido->MostrarGarage();
    }

    // Probar ValidarArrayGarages y MostrarListadoGarages
    echo "\nPrueba de ValidarArrayGarages y MostrarListadoGarages:\n";
    $resultadoValidacion = Garage::ValidarArrayGarages([$garage]);
    echo $resultadoValidacion ? 'Array válido' : 'Array inválido'; // Esperado: 'Array válido'

    Garage::MostrarListadoGarages([$garage]);
}

// Ejecutar pruebas
runTests();