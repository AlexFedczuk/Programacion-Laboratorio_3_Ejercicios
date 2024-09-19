<?php

class Usuario {
    private $_id;
    private $_nombre;
    private $_clave;
    private $_mail;
    private $_fechaRegistro;
    private $_fotoPath;
    
    public function __construct(string $nombre, string $clave, string $mail, string $fotoPath = "", int $id = null) {
        $this->_id = $id === null ? $this->generarIdUnico() : $id;
        $this->_nombre = $nombre;
        $this->_clave = $clave;
        $this->_mail = $mail;        
        $this->_fechaRegistro = date('d-m-Y H:i:s');
        $this->_fotoPath = $fotoPath;
    }

    private function generarIdUnico() {
        $idsExistentes = $this->obtenerIdsExistentes();
        do {
            $idGnerado = rand(1, 10000);
        } while (in_array($idGnerado, $idsExistentes));

        return $idGnerado;
    }

    private function obtenerIdsExistentes() {
        $usuarios = json_decode(file_get_contents("usuarios.json"), true);
        $ids = [];

        if ($usuarios) {
            foreach ($usuarios as $usuario) {
                $ids[] = $usuario["id"];
            }
        }
        return $ids;
    }

    public function SetId(int $id): void {
        $this->_id = $id;
    }

    public function GetNombre(): string {
        return $this->_nombre;
    }

    public function GetClave(): string {
        return $this->_clave;
    }

    public function GetMail(): string {
        return $this->_mail;
    }

    public function MostrarUsuario(): void{        
        echo "Clave: $this->_clave\n";
        echo "Mail: $this->_mail\n";
        echo "Nombre: $this->_nombre\n";
    }

    public static function VerificarUsuarioEnLista(array $listaUsuarios, Usuario $nuevoUsuario): bool {
        $retorno = false;

        foreach($listaUsuarios as $usuario) {
            if ($usuario->GetMail() == $nuevoUsuario->GetMail() && $usuario->GetNombre() == $nuevoUsuario->GetNombre()) {
                echo "Error: El correo '".$nuevoUsuario->GetMail()." y el nombre de usuario'".$nuevoUsuario->GetNombre().", ya existen en nuestro sistema.";
                $retorno = true;
                break;
            }elseif ($usuario->GetMail() == $nuevoUsuario->GetMail()) {
                echo "Error: El correo '".$nuevoUsuario->GetMail()."', ya existe en nuestro sistema.";
                $retorno = true;
                break;
            }elseif ($usuario->GetNombre() == $nuevoUsuario->GetNombre()) {
                echo "Error: El nombre de usuario '".$nuevoUsuario->GetNombre()."', ya existe en nuestro sistema.";
                $retorno = true;
                break;
            }
        }
        return $retorno;
    }

    public function GuardarUsuarioJSON(string $archivoJson): bool {
        $retorno = false;

        $usuarios = [];
        if (file_exists($archivoJson)) {
            $usuarios = json_decode(file_get_contents($archivoJson), true) ?? [];
        }

        $usuarios[] = [
            'id' => $this->_id,
            'nombre' => $this->_nombre,
            'clave' => $this->_clave,
            'mail' => $this->_mail,
            'fechaRegistro' => $this->_fechaRegistro,
            'foto' => $this->_fotoPath
        ];

        // Guardar los usuarios actualizados en el archivo JSON
        if (file_put_contents($archivoJson, json_encode($usuarios, JSON_PRETTY_PRINT))) {
            $retorno = true;
        } else {
            echo "Error: No se pudo guardar en el archivo JSON: '$archivoJson'.\n";
        }

        return $retorno;
    }

    public function GuardarUsuarioDesdeJSON(string $archivoJson): array {
        $lista_usuarios_cargados = [];

        if (file_exists($archivoJson)) {
            $json = file_get_contents($archivoJson, true) ?? [];
            $datos = json_decode($json, true) ?? [];
            
            if ($datos) {
                foreach ($datos as $dato) {
                    $usuarios[] = new Usuario(
                        $dato["nombre"],
                        $dato["clave"],
                        $dato["mail"],
                        $dato["foto"],
                        $dato["id"]
                    );
                }
            }            
        }

        return $lista_usuarios_cargados;
    }

    public function SubirFoto(string $directorio, $foto): bool {
        $retorno = false;

        // Se creará el directorio si no existe.
        if (!file_exists($directorio)) {
            mkdir($directorio, 0777, true);
        }

        $rutaArchivo = $directorio . basename($foto['name']);
        if (move_uploaded_file($foto['tmp_name'], $rutaArchivo)) {
            echo "Exito! La foto ha sido subida exitosamente.\n";
            $retorno = true;
        } else {
            echo "Error: No se ha podido subir la foto.\n";
        }

        return $retorno;
    }
}