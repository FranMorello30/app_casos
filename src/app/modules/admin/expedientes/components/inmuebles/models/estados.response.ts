export interface EstadosResponse {
    estados: Estado[];
}

export interface Estado {
    id_estado:   number;
    nombre:     string;
    municipios: Municipio[];
}

export interface Municipio {
    id_municipio: number;
    nombre:      string;
}
