<?php
/*
    Aplicación No 20 BIS (Registro CSV)
    Archivo: registro.php
    método: POST

    Recibe los datos del usuario(nombre, clave,mail )por POST, crear un objeto y utilizar sus métodos para poder hacer el alta,
    guardando los datos en usuarios.csv. Retorna si se pudo agregar o no. Cada usuario se agrega en un renglón diferente al anterior.
    Hacer los métodos necesarios en la clase usuario.
*/

require_once "classUsuario.php";

if (isset($_POST["nombre"], $_POST["clave"], $_POST["mail"])) {
    $nombre = $_POST["nombre"];
    $clave = $_POST["clave"];
    $mail = $_POST["mail"];

    $usuario = new Usuario($nombre, $clave, $mail);
    $archivo = "archivo_de_usuario.csv";

    if($usuario->GuardarUsuario($archivo)) {
        echo "Exito! El usurio: ".$usuario->GetNombre()." se ha agregado al archivo: $archivo\n";
    }else{
        echo "Error: No se ha podido agregar al usurio se ha agregado al archivo: $archivo\n";
    }
}else {
    echo "Error: Faltan datos. Asegúrese de enviar los siguientes datos: 'nombre', 'clave' y 'mail'.";
}