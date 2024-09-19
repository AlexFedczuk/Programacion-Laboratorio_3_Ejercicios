<?php
/*
Aplicación No 23 (Registro JSON)
Archivo: registro.php
método:POST

Recibe los datos del usuario(nombre, clave,mail )por POST ,
crea un ID autoincremental(emulado, puede ser un random de 1 a 10.000). crear un dato con la
fecha de registro , toma todos los datos y utilizar sus métodos para poder hacer el alta,
guardando los datos en usuarios.json y subir la imagen al servidor en la carpeta
Usuario/Fotos/.
retorna si se pudo agregar o no.

Cada usuario se agrega en un renglón diferente al anterior.

Hacer los métodos necesarios en la clase usuario.
*/
require_once "classUsuario.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST["nombre"] ?? "";
    $clave = $_POST["clave"] ?? "";
    $mail = $_POST["mail"] ?? "";
    $foto = $_FILES["foto"] ?? null;

    
    if ($nombre && $clave && $mail && $foto && $foto["error"] === UPLOAD_ERR_OK) {
        $usuario = new Usuario($nombre, $clave, $mail, $foto["name"]);
        
        $directorio = "Usuarios/usuarios.json";
        if(Usuario::VerificarUsuarioEnLista(Usuario::CargarUsuarioDesdeJSON($directorio), $usuario) === false) {
            $directorio_de_fotos = "Fotos/";
            if ($usuario->SubirFoto($directorio_de_fotos, $foto)) { // <-- En esta linea del codigo está el problema!
                
                if ($usuario->GuardarUsuarioJSON($directorio)) {
                    echo "Exito! El usuario '".$usuario->GetNombre()."' ha sido registrado.\n";
                } else {
                    echo "Error: El usuario '".$usuario->GetNombre()."' NO ha sido registrado.\n";
                }
            }
        }        
    } else {
        echo "Error: Faltan datos para cargar un usuario.\n";
    }
} else {
    echo "Error: Método incorrecto. Debes usar del tipo POST.\n";
}
