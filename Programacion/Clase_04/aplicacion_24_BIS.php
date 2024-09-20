<?php
/*
Aplicación No 24 ( Listado JSON y array de usuarios)
Archivo: listado.php
método:GET

Recibe qué listado va a retornar(ej:usuarios,productos,vehículos,etc.),por ahora solo tenemos
usuarios).

En el caso de usuarios carga los datos del archivo usuarios.json.
se deben cargar los datos en un array de usuarios.
Retorna los datos que contiene ese array en una lista.
Hacer los métodos necesarios en la clase usuario
*/
require_once "classUsuario.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $directorio = "Usuarios/usuarios.json";
    $lista_usuarios_cargada = Usuario::CargarUsuarioDesdeJSON($directorio);
    if($lista_usuarios_cargada !== []) {
        echo "*** Lista de Usuarios: ***\n-\n";
        foreach ($lista_usuarios_cargada as $usuario) {
            $usuario->MostrarUsuario();
            echo "-\n";
        }
    }else{
        echo "Error: La lista de usuarios no está cargada. Fuente/directorio: '$directorio'.\n";
    }
} else {
    echo "Error: Método incorrecto. Debes usar del tipo GET.\n";
}
