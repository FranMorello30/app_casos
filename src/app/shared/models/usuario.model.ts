export class Usuario {
    id:            string;
    username:      string;
    nombre:        string;
    apellido:      string;
    telefono:      string;
    correo:        string;
    cargo:         string;
    dependencia:   string;
    avatar:        string;
    rol:           Rol;
    ultimo_acceso?:string;
    password?:     string;
    status?:       boolean;
    estado?: string;
}
export type Rol = 'ADMINISTRADOR' | 'OPERADOR' | 'SUPERVISOR' | 'INVESTIGADOR';


