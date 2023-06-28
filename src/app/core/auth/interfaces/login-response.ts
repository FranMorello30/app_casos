import { Rol } from "@shared/models/usuario.model";

export interface LoginResponse {
    username:      string;
    nombre:        string;
    apellido:      string;
    telefono:      string;
    correo:        string;
    cargo:         string;
    dependencia:   string;
    rol:           Rol;
    token:         string;
}

