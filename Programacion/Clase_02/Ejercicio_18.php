<?php

/*
Aplicación No 18 (Auto - Garage)
Crear la clase Garage que posea como atributos privados:

_razonSocial (String)
_precioPorHora (Double)
_autos (Autos[], reutilizar la clase Auto del ejercicio anterior)

Realizar un constructor capaz de poder instanciar objetos pasándole como parámetros: 
i. La razón social.
ii. La razón social, y el precio por hora.

* Realizar un método de instancia llamado “MostrarGarage”, que no recibirá parámetros y
que mostrará todos los atributos del objeto.

* Crear el método de instancia “Equals” que permita comparar al objeto de tipo Garaje con un
objeto de tipo Auto. Sólo devolverá TRUE si el auto está en el garaje.

* Crear el método de instancia “Add” para que permita sumar un objeto “Auto” al “Garage”
(sólo si el auto no está en el garaje, de lo contrario informarlo).
Ejemplo: $miGarage->Add($autoUno);

* Crear el método de instancia “Remove” para que permita quitar un objeto “Auto”
del “Garage” (sólo si el auto está en el garaje, de lo contrario informarlo). Ejemplo:
$miGarage->Remove($autoUno);

En testGarage.php, crear autos y un garage. Probar el buen funcionamiento de todos
los métodos.
*/

require_once 'Ejercicio_17.php';

class Garage {
    private $_razonSocial;
    private $_precioPorHora;
    private $_autos = [];

    public function __construct(string $razonSocial, float $precioPorHora = 0.0) {
        $this->_razonSocial = $razonSocial;
        $this->_precioPorHora = $precioPorHora;
    }

    public function MostrarGarage() {
        echo "Razón Social: " . $this->_razonSocial . "\n";
        echo "Precio por Hora: $" . $this->_precioPorHora . "\n";
        echo "Autos en el Garage:\n";
        foreach ($this->_autos as $auto) {
            $auto->MostrarAuto();
            echo "\n";
        }
    }

    public function Equals(Auto $auto) {
        foreach ($this->_autos as $autoEnGarage) {
            if ($auto->Equals($autoEnGarage)) {
                return true;
            }
        }
        return false;
    }

    public function Add(Auto $auto) {
        if ($this->Equals($auto)) {
            echo "El auto ya está en el garage.\n";
        } else {
            $this->_autos[] = $auto;
            echo "Auto agregado al garage.\n";
        }
    }

    public function Remove(Auto $auto) {
        foreach ($this->_autos as $index => $autoEnGarage) {
            if ($auto->Equals($autoEnGarage)) {
                unset($this->_autos[$index]);
                $this->_autos = array_values($this->_autos); // Reindexar el array
                echo "Auto eliminado del garage.\n";
                return;
            }
        }
        echo "El auto no está en el garage.\n";
    }
}