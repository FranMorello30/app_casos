export interface InmueblesResponse {
    inmuebles: Inmueble[];
    inmueble: Inmueble;
}

export interface Inmueble {
    id: string;
    tipo: string;
    direccion: string;
    propietario: string;
    telefono: string;
    estado: string;
    id_estado: number;
    municipio: string;
    fecha_compra: string;
    fecha: Date;
    imagenes: null;
    estatus: string;
    nro: string;
    observaciones: string;
}
