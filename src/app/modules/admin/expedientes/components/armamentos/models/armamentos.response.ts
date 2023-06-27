export interface ArmasResponse {
    armas: Armamento[];
    arma: Armamento;
}


export interface Armamento {
    id:          string;
    marca:       string;
    modelo:      string;
    serial:      string;
    procedencia: string;
    observaciones: string;
    fecha:       Date;
    imagenes:    null;
}

