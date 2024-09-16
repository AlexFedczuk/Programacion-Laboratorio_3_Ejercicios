<?php
/*
    Aplicación No 22 (Login)
    Archivo: Login.php
    método:POST

    Recibe los datos del usuario(clave,mail )por POST, crear un objeto y utilizar sus métodos para poder verificar si es un usuario registrado.
    Retorna un: “Verificado” si el usuario existe y coincide la clave también. “Error en los datos” si esta mal la clave.
    “Usuario no registrado si no coincide el mail“.
    
    Hacer los métodos necesarios en la clase usuario.
*/

require_once "classUsuario.php";

if (isset($_POST["clave"], $_POST["mail"])) {
    $clave = $_POST["clave"];
    $mail = $_POST["mail"];

    $usuario = new Usuario($clave, $mail);
    $archivo = "archivo_de_usuario.csv";

    if (file_exists($archivo)) {
        if (Usuario::VerificarUsuarioEnLista(Usuario::LeerUsuarioArchivoCSV($archivo), $usuario)) {
            echo "Exito! El usuario existe en la lista.\n";
        }else {
            echo "Error: No se encuentra el usuario en la lista.\n";
        }
    }else {
        echo "Error: No se ha podido abrir el archivo: '$archivo'.\n";
    }
}

    