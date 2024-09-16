<?php

class Usuario {
    private $nombre;
    private $clave;
    private $mail;
    
    public function __construct(string $nombre, string $clave, string $mail) {
        $this->nombre = $nombre;
        $this->clave = $clave;
        $this->mail = $mail;
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
                $this->nombre,
                $this->clave,
                $this->mail
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
        echo "Nombre: $this->nombre\n";
        echo "Clave: $this->clave\n";
        echo "Mail: $this->mail\n";
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
            $html .= "<li> Nombre: ".$usuario->GetNombre()." - Clave: ".$usuario->GetClave()." - Mail: ".$usuario->GetMail()."</li>\n";
        }
        $html .= "</lu>\n";        
        return $html;
    }
}