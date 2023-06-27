export class Usuario {
    nombre: string;
    email: string;
    avatar?: string;
    rol: string;
    telefono: string;
    estado?: string;
    token?: string;
}
export type Rol = 'ADMINISTRADOR' | 'OPERADOR' | 'SUPERVISOR' | 'INVESTIGADOR';

export interface LoginResponse{
    token: string;
    usuario: Usuario;
}
