<?php

class Usuario {
    private $nombre;
    private $clave;
    private $mail;
    
    public function __construct(string $clave, string $mail, string $nombre = "") {       
        $this->clave = $clave;
        $this->mail = $mail;
        $this->nombre = $nombre;
    }

    public function GetNombre(): string {
        return $this->nombre;
    }

    public function GetClave(): string {
        return $this->clave;
    }

    public function GetMail(): string {
        return $this->mail;
    }

    public function GuardarUsuario(string $archivo): bool {
        $retorno = false;

        $file = fopen($archivo,"a");

        if ($file) {
            $datosUsuario = [                
                $this->clave,
                $this->mail,
                $this->nombre
            ];

            fputcsv( $file, $datosUsuario);

            fclose($file);
            $retorno = true;
        }else{
            echo "Error: No se pudo abrir el archivo: $archivo\n";
        }

        return $retorno;
    }

    public function MostrarUsuario(): void{        
        echo "Clave: $this->clave\n";
        echo "Mail: $this->mail\n";
        echo "Nombre: $this->nombre\n";
    }

    public static function LeerUsuarioArchivoCSV(string $archivo): array {
        $usuarios = [];
        
        if(file_exists($archivo)) {
            $file = fopen($archivo, "r");
            while (($datos = fgetcsv($file,1000,",")) !== false) {
                $usuarios[] = new Usuario($datos[0], $datos[1], $datos[2]);
            }
            fclose($file);
        }else{
            echo "Error: No se ha podido abrir el archivo: $archivo\n";
        }
        
        return $usuarios;
    }

    public static function MostrarUsuariosListaHTML(array $usuarios): string  {
        $html = "<ul>\n";

        $html .= "<li> Lista de Usuarios: </li>\n";
        foreach($usuarios as $usuario) {
            $html .= "<li> Clave: ".$usuario->GetClave()." - Mail: ".$usuario->GetMail()." - Nombre: ".$usuario->GetNombre()."</li>\n";
        }
        $html .= "</lu>\n";        
        return $html;
    }

    public function Equals(Usuario $otroUsuario): bool {
        return $this->GetClave() == $otroUsuario->GetClave() && $this->GetMail() == $otroUsuario->GetMail();
    }

    public static function VerificarUsuarioEnLista(array $listaUsuarios, Usuario $usuarioIngresado): bool {
        foreach($listaUsuarios as $usuario) {
            if($usuario->GetMail() == $usuarioIngresado->GetMail() && $usuario->GetClave() == $usuarioIngresado->GetClave()) {
                echo "Verificado.\n";
                return true;
            }elseif ($usuario->GetMail() == $usuarioIngresado->GetMail() && $usuario->GetClave() != $usuarioIngresado->GetClave()) {
                echo "Error en los datos.\n";
                return true;
            }
        }
        echo "Usuario no registrado.\n";
        return false;
    }
}