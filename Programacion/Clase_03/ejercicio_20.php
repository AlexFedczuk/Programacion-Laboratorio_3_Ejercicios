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

    public function __construct(string $razonSocial, float $precioPorHora = 0.0, array $autos = null) {
        $this->_razonSocial = $razonSocial;
        $this->_precioPorHora = $precioPorHora;
        $this->SetAutos($autos);
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

    public function SetAutos(array $autos): bool {
        $retorno = false;
        if (Auto::ValidarArrayAutos($autos)) {
            if ($autos === null) {
                $this->_autos = [];
                
            }else {
                $this->_autos = $autos;
            }
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
        echo "Autos en el Garage:\n";
        foreach ($this->GetAutos() as $auto) {
            Auto::MostrarAuto($auto);
            echo "\n";
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
                $datos[] = implode(",", [
                    $auto->GetMarca(),
                    $auto->GetColor(),
                    $auto->GetPrecio(),
                    $auto->GetFecha()->format('d-m-Y')
                ]);
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

    public static function LeerGarages(string $archivo) {
        $garages = [] ;
        $file = fopen($archivo,"r");

        if ($file) {                        
            while (($datos = fgetcsv($file)) !== false) {
                if (count($datos) < 2) {
                    echo "Error: Línea del archivo CSV con datos insuficientes.\n";
                    continue;
                }

                $razonSocial = $datos[0];
                $precioPorHora = (float)$datos[1];
                $autos = [];

                for ($i = 1; $i <= $precioPorHora; $i++) {
                    // Verificar si hay suficientes datos para un auto
                    if (isset($datos[$i + 4])) {
                        $autos[] = new Auto(
                            $datos[2],
                            $datos[3],
                            (float)$datos[4],
                            DateTime::createFromFormat("d-m-Y", $datos[5])
                        );
                    }else {
                        echo "Advertencia: Datos insuficientes para crear un auto completo en el archivo CSV.\n";
                    }
                }               

                echo implode($autos);

                $garages[] = new Garage($razonSocial, $precioPorHora, $autos);
            }
            echo "Éxito: Se pudo leer los datos del archivo: '$archivo'\n";
            fclose($file);
            echo "Se cerró el archivo: '$archivo' exitosamente.\n";

        }else {
            echo "Error: Hubo un error al intentar abrir el archivo: '$archivo'\n";
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
        return false;
    }
}