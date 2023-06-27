export interface Users {
    users: UserChat[];
}
export interface UserChat {
    id: string;
    nombre: string;
    img: string;
    estado: 'online' | 'do-not-disturb' | 'offline';
    sinLeer?: number;
}
export interface MessageChat {
    id:      string;
    mensajes: Message[];
}
export interface Message {
    de: string;
    mensaje: string;
    tiempo: Date | null;
}

