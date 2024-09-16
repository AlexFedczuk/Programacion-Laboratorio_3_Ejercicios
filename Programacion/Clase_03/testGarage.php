<?php
include 'ejercicio_20.php';

function runTests(): void {
    // Crear instancias de Auto
    $auto1 = new Auto('Toyota', 'Rojo', 15000.55, new DateTime('2023-03-15'));
    $auto2 = new Auto('Honda', 'Azul', 12000.45, new DateTime('2022-06-10'));
    $auto3 = new Auto('Toyota', 'Rojo');
    $auto4 = new Auto('BMW', 'Negro', 20500.34);

    
    // Crear instancia de Garage
    $garage = new Garage('Garage Central', 20.3);

    // Probar métodos Add y Remove
    echo "\n*** Prueba de Add y Remove: ***\n";
    $garage->Add($auto1);
    $garage->Add($auto2);
    $garage->Add($auto3);
    $garage->Add($auto4);

    $garage->Remove($auto3);
    
    echo "\n*** Mostrar Garage: ***\n";
    $garage->MostrarGarage();

    echo "\n*** Prueba de AltaGarage y LeerGarages: ***\n";
    $archivo = "archivo_de_garages.csv";
    Garage::AltaGarage($garage, $archivo);

    $garagesLeidos = Garage::LeerGarages($archivo);
    foreach ($garagesLeidos as $garageLeido) {
        $garageLeido->MostrarGarage();
    }

    // Probar ValidarArrayGarages y MostrarListadoGarages
    echo "\n*** Prueba de MostrarListadoGarages: ***\n";
    Garage::MostrarListadoGarages([$garage, $garagesLeidos]);
}

// Ejecutar pruebas
runTests();