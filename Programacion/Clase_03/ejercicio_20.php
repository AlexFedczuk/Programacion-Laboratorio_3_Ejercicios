<?php
/*
Aplicación No 20 (Auto - Garage)
Crear la clase Garage que posea como atributos privados:

_razonSocial (String)
_precioPorHora (Double)
_autos (Autos[], reutilizar la clase Auto del ejercicio anterior)

Realizar un constructor capaz de poder instanciar objetos pasándole como.

parámetros:
i. La razón social.
ii. La razón social, y el precio por hora.

Realizar un método de instancia llamado “MostrarGarage”, que no recibirá parámetros y que
mostrará todos los atributos del objeto.

Crear el método de instancia “Equals” que permita comparar al objeto de tipo Garaje con un objeto de
tipo Auto. Sólo devolverá TRUE si el auto está en el garaje.

Crear el método de instancia “Add” para que permita sumar un objeto “Auto” al “Garage” (sólo si el
auto no está en el garaje, de lo contrario informarlo).
Ejemplo: $miGarage->Add($autoUno);

Crear el método de instancia “Remove” para que permita quitar un objeto “Auto” del
“Garage” (sólo si el auto está en el garaje, de lo contrario informarlo). Ejemplo:
$miGarage->Remove($autoUno);

Crear un método de clase para poder hacer el alta de un Garage y, guardando los datos en un archivo
garages.csv.

Hacer los métodos necesarios en la clase Garage para poder leer el listado desde el archivo
garage.csv

Se deben cargar los datos en un array de garage.

En testGarage.php, crear autos y un garage. Probar el buen funcionamiento de todos los
métodos.
*/

require 'ejercicio_19.php';
class Garage {
    private $_razonSocial;
    private $_precioPorHora;
    private $_autos = [];

    public function __construct(string $razonSocial, float $precioPorHora = 0.0) {
        $this->_razonSocial = $razonSocial;
        $this->_precioPorHora = $precioPorHora;
    }

    public function SetRazonSocial(string $razonSocial): bool {
        $retorno = false;
        if (is_string($razonSocial)) {
            $this->_razonSocial = $razonSocial;
            $retorno = true;
        }
        return $retorno;
    }

    public function SetPrecioPorHora(float $precioPorHora): bool {
        $retorno = false;
        if (is_float($precioPorHora)) {
            $this->_precioPorHora = $precioPorHora;
            $retorno = true;
        }
        return $retorno;
    }

    public function GetRazonSocial(): string {
        return $this->_razonSocial;
    }

    public function GetPrecioPorHora(): float {
        return $this->_precioPorHora;
    }

    public function GetAutos(): array {
        return $this->_autos;
    }

    public function MostrarGarage(): void {
        echo "Razón Social: " . $this->GetRazonSocial() . "\n";
        echo "Precio por Hora: $" . $this->GetPrecioPorHora() . "\n";
        echo "Autos en el Garage:\n\n";
        foreach ($this->GetAutos() as $auto) {
            Auto::MostrarAuto($auto);
            echo "-\n";
        }
    }

    public function Equals(Auto $auto): bool {
        foreach ($this->GetAutos() as $autoEnGarage) {
            if ($auto->Equals($autoEnGarage)) {
                return true;
            }
        }
        return false;
    }

    public function Add(Auto $auto): bool {
        $retorno = false;
        if ($this->Equals($auto)) {
            echo "Error: El auto ya está en el garage.\n";            
        } else {
            $this->_autos[] = $auto;
            echo "Exito: Auto agregado al garage!\n";
            $retorno = true;
        }

        return $retorno;
    }

    public function Remove(Auto $auto): bool {
        foreach ($this->GetAutos() as $index => $autoEnGarage) {
            if ($auto->Equals($autoEnGarage)) {
                unset($this->_autos[$index]);
                $this->_autos = array_values($this->_autos); // Reindexar el array
                echo "Exito: Auto eliminado del garage!\n";
                return true;
            }
        }
        return false;
    }

    public static function AltaGarage(Garage $garage, string $archivo): bool {
        $retorno = false;   
        $file = fopen($archivo,"a");

        if ($file) {
            $datos = [
                $garage->GetRazonSocial(),
                $garage->GetPrecioPorHora()
            ];
            foreach ($garage->GetAutos() as $auto) {
                $datos[] = $auto->GetMarca();
                $datos[] = $auto->GetColor();
                $datos[] = $auto->GetPrecio();
                $datos[] = $auto->GetFecha()->format('d-m-Y');
            }

            fputcsv($file, $datos);
            fclose($file);

            echo "El garage ha sido guardado correctamente en el archivo: '$archivo'\n";
            $retorno = true;
        }else {
            echo "Error: Hubo un error al intentar abrir el archivo: '$archivo'\n";
        }

        return $retorno;
    }

    public static function LeerGarages(string $archivo): array {
        $garages = [];
        
        if (file_exists($archivo)) {
            $file = fopen($archivo, "r");
    
            if ($file) {
                while (($data = fgetcsv($file)) !== false) {
                    // Asumiendo que los primeros dos campos son los del garage
                    $razonSocial = $data[0];
                    $precioPorHora = floatval($data[1]);
    
                    // Crear un nuevo objeto Garage con la razón social y el precio por hora
                    $garage = new Garage($razonSocial, $precioPorHora);
    
                    // Ahora vamos a leer los autos que siguen a partir de la posición 2 en adelante
                    $i = 2;
                    while ($i < count($data)) {
                        $marca = $data[$i++];
                        $color = $data[$i++];
                        $precio = (float)$data[$i++];
                        $fecha = DateTime::createFromFormat('d-m-Y', $data[$i++]);
    
                        // Creamos el auto con los datos leídos
                        $auto = new Auto($marca, $color, $precio, $fecha);
    
                        // Agregamos el auto al garage
                        $garage->Add($auto);
                    }
    
                    // Agregamos el garage al array de garages
                    $garages[] = $garage;
                }
    
                fclose($file);
            } else {
                echo "Error: No se pudo abrir el archivo para lectura.\n";
            }
        } else {
            echo "Error: El archivo no existe.\n";
        }
    
        return $garages;
    }

    public static function MostrarListadoGarages(array $garages): bool{
        $retorno = false;
        if (Garage::ValidarArrayGarages($garages)) {
            foreach ($garages as $garage) {
                $garage->MostrarGarage();
                echo "\n";
            }
            $retorno = true;
        }

        return $retorno;
    }

    public static function ValidarArrayGarages(array $garages): bool{
        foreach ($garages as $garage) {
            if (!($garage instanceof Garage)) {                
                echo "Error: El array debe contener objetos de tipo 'Garage' en el array.";
                return false;
            }
        }
        echo "Exito: El array CONTIENE objetos de tipo 'Garage' en el array.";
        return true;
    }
}