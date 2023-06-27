export interface UsersResponse {
    users: User[];
}
export interface User {
    id:          string;
    username:    string;
    nombre:      string;
    apellido:    string;
    telefono:    string;
    correo:      string;
    cargo:       string;
    dependencia: string;
    rol:         string;
}
