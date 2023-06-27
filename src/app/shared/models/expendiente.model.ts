export interface EstadoRespones {
    estado: Estado[];
}
export class Estado {
    id: number;
    estado: string;
    gestionable: boolean;
    tipo: string;
    habilitado: boolean;
    camp_cobranza: boolean;
    clasificacion: string;

    constructor(estado)
    {
        {
            this.id  = estado.id || 0;
            this.estado  = estado.estado || '';
            this.gestionable  = estado.gestionable || false;
            this.habilitado  = estado.habilitado || false;
            this.tipo  = estado.tipo || '';
        }
    }
}
