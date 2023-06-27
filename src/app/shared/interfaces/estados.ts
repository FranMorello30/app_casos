/* eslint-disable @typescript-eslint/naming-convention */
export interface EdoPams {
    id:          number;
    estado:      string;
    Gestionable: number;
    tipo:        Tipo;
    createdAt:   null;
    updatedAt:   null;
}


export interface EdoPacientes {
    id:          number;
    estado:      string;
    Gestionable: number;
    tipo:        Tipo;
    createdAt:   null;
    updatedAt:   null;
}

export enum Tipo {
    A = 'A',
    M = 'M',
}
