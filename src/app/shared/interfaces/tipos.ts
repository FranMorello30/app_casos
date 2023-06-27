/* eslint-disable @typescript-eslint/naming-convention */
export interface TipoPrestacion {
    tipo_prestacion: string;
}

export type tipoGestion =
    | 'BITACORA'
    | 'SMS'
    | 'LLAMADA SALIENTE'
    | 'LLAMADA RECIBIDA'
    | 'EMAIL ENVIADO'
    | 'EMAIL RECIBIDO'
    | 'PAGOS'
    | 'WHATSAPP';
