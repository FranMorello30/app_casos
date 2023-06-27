/* eslint-disable @typescript-eslint/naming-convention */
export interface HistorialAsignaciones {
    id:             number;
    id_ejecutivo:   number;
    fecha:          Date | string;
    fecha_inicio:   Date | string;
    fecha_limite:   Date | string;
    cant_pam:       number;
    cant_pac:       number;
    tot_xbonificar: number;
    tot_copago:     number;
    status:         string;
    tipo:           string;
}

