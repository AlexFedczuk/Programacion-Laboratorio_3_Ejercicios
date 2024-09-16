<?php
/*
    Aplicación No 21 ( Listado CSV y array de usuarios)
    Archivo: listado.php
    método:GET
    
    Recibe qué listado va a retornar(ej:usuarios,productos,vehículos,...etc),por ahora solo tenemos
    usuarios).
    En el caso de usuarios, carga los datos del archivo usuarios.csv. Se deben cargar los datos en un array de usuarios.
    Retorna los datos que contiene ese array en una lista.

    <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
    </ul>

    Hacer los métodos necesarios en la clase usuario
*/

require_once "classUsuario.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET["listado"]) && $_GET["listado"] === "usuarios") {
        $archivoUsuarios = "archivo_de_usuario.csv";
        
        $usuarios = Usuario::LeerUsuarioArchivoCSV($archivoUsuarios);

        echo Usuario::MostrarUsuariosListaHTML($usuarios);
    }else{
        echo "Error: El listado solicitado no es válido.\n";
    }    
}else {
    echo "Error: El método debe ser GET.";
}