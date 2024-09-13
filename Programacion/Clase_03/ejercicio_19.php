<?php
/*
Aplicación No 19 (Auto)
Realizar una clase llamada “Auto” que posea los siguientes atributos

privados: _color (String)
_precio (Double)
_marca (String).
_fecha (DateTime)

Realizar un constructor capaz de poder instanciar objetos pasándole como

parámetros: 
    i. La marca y el color.
    ii. La marca, color y el precio.
    iii. La marca, color, precio y fecha.

Realizar un método de instancia llamado “AgregarImpuestos”, que recibirá un doble por
parámetro y que se sumará al precio del objeto.

Realizar un método de clase llamado “MostrarAuto”, que recibirá un objeto de tipo “Auto” por
parámetro y que mostrará todos los atributos de dicho objeto.

Crear el método de instancia “Equals” que permita comparar dos objetos de tipo “Auto”. Sólo devolverá
TRUE si ambos “Autos” son de la misma marca.

Crear un método de clase, llamado “Add” que permita sumar dos objetos “Auto” (sólo si son de la
misma marca, y del mismo color, de lo contrario informarlo) y que retorne un Double con la suma de los
precios o cero si no se pudo realizar la operación.
Ejemplo: $importeDouble = Auto::Add($autoUno, $autoDos);

Crear un método de clase para poder hacer el alta de un Auto, guardando los datos en un archivo
autos.csv.

Hacer los métodos necesarios en la clase Auto para poder leer el listado desde el archivo
autos.csv

Se deben cargar los datos en un array de autos.

En testAuto.php:
● Crear dos objetos “Auto” de la misma marca y distinto color.
● Crear dos objetos “Auto” de la misma marca, mismo color y distinto precio. ● Crear
un objeto “Auto” utilizando la sobrecarga restante.
● Utilizar el método “AgregarImpuesto” en los últimos tres objetos, agregando $ 1500 al
atributo precio.
● Obtener el importe sumado del primer objeto “Auto” más el segundo y mostrar el
resultado obtenido.
● Comparar el primer “Auto” con el segundo y quinto objeto e informar si son iguales o no.
● Utilizar el método de clase “MostrarAuto” para mostrar cada los objetos impares (1, 3, 5)
*/

class Auto {
    private $_color;
    private $_precio;
    private $_marca;
    private $_fecha;

    public function __construct(string $marca, string $color, float $precio = 0.0, DateTime $fecha = null) {
        $this->_color = $color;
        $this->_precio = $precio;
        $this->_marca = $marca;
        $this->_fecha = $fecha ?? new DateTime(); 
    }

    public function GetColor(): string {
        return $this->_color;
    }

    public function GetPrecio(): float{
        return $this->_precio;
    }

    public function GetMarca(): string {
        return $this->_marca;
    }

    public function GetFecha(): DateTime {
        return $this->_fecha;
    }

    public function SetColor(string $color): bool {
        $retorno = false;
        if (is_string($color)) {
            $this->_color = $color;
            $retorno = true;
        }
        return $retorno;
    }
    
    public function SetPrecio(float $precio): bool {
        $retorno = false;
        if (is_float($precio)) {
            $this->_precio = $precio;
            $retorno = true;
        }
        return $retorno;
    }

    public function SetMarca(string $marca): bool {
        $retorno = false;
        if (is_string($marca)) {
            $this->_marca = $marca;
            $retorno = true;
        }
        return $retorno;
    }

    public function SetFecha(DateTime $fecha): bool {
        $retorno = false;
        if ($fecha instanceof DateTime) {
            $this->_fecha = $fecha;
            $retorno = true;
        }
        return $retorno;
    }

    public function AgregarImpuestos(float $impuesto) {
        $this->_precio += $impuesto;
    }

    public static function MostrarAuto(Auto $auto) {
        echo "Marca: " . $auto->GetMarca() . "\n";
        echo "Color: " . $auto->GetColor() . "\n";
        echo "Precio: $" . $auto->GetPrecio() . "\n";
        echo "Fecha: " . $auto->GetFecha()->format('Y-m-d') . "\n";
    }

    public function Equals(Auto $otroAuto){
        return $this->GetMarca() == $otroAuto->GetMarca();
    }

    public static function Add(Auto $auto1, Auto $auto2) {
        $retorno = 0.0;
        if ($auto1->GetMarca() == $auto2->GetMarca() && $auto1->GetColor() == $auto2->GetColor()) {
            $retorno = $auto1->GetPrecio() + $auto2->GetPrecio();
        }else{
            echo "Sólo si son de la misma marca y del mismo color se pueden sumar sus precios.\n";
        }
        return $retorno;
    }

    public static function AltaAuto(Auto $auto, string $archivo) {
        $retorno = false;
        $file = fopen($archivo,"a");

        if ($file) {
            $datos = [
                $auto->GetMarca(),
                $auto->GetColor(),
                $auto->GetPrecio(),
                $auto->GetFecha()->format('d-m-Y')
            ];

            fputcsv($file, $datos);
            fclose($file);

            echo "El auto ha sido guardado correctamente en el archivo: '$archivo'\n";
            $retorno = true;
        }else {
            echo "Error: Hubo un error al intentar abrir el archivo: '$archivo'\n";
        }

        return $retorno;
    }

    public static function LeerAutos(string $archivo) {
        $autos = [] ;
        $file = fopen($archivo,"r");

        if ($file) {                        
            while (($datos = fgetcsv($file)) !== false) {
                $marca = $datos[0];
                $color = $datos[1];
                $precio = (float)$datos[2];
                $fecha = DateTime::createFromFormat("d-m-Y", $datos[3]);

                $autos[] = new Auto($marca, $color, $precio, $fecha);
            }

            fclose($file);
        }else {
            echo "Error: Hubo un error al intentar abrir el archivo: '$archivo'\n";
        } 
        
        return $autos;
    }

    public static function MostrarListadoAutos(array $autos) {
        $retorno = false;
        if ($autos != null) {
            foreach ($autos as $auto) {
                $auto->MostrarAuto();
                echo "\n";
            }
            $retorno = true;
        }else {
            echo "Error: La lista de autos está vacia.";
        }

        return $retorno;
    }

    public static function ValidarArrayAutos(array $autos) {
        $retorno = true;
        foreach ($autos as $auto) {
            if (!($auto instanceof Auto)) {
                $retorno = false;
                echo "Error: En el Constructor de Garage: Se deben cargar objetos de tipo 'Auto' en el array '_autos'.";
                break;
            }
        }
        return $retorno;
    }
}