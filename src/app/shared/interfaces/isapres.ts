/* eslint-disable @typescript-eslint/naming-convention */
export interface Isapre {
    id:                       number;
    rut:                      string;
    nombre:                   string;
    siglas:                   string;
    cant_pams:                number;
    cant_pacientes:           number;
    deuda_inicial:            number;
    deuda_actual:             number;
    deuda_copago_inicial:     number;
    deuda_copago_actual:      number;
    deuda_xbonificar_inicial: number;
    deuda_xbonificar_actual:  number;
    bonos_recibidos:          number;
    copagos_recibidos:        number;
    DiasGestionPam:           number;
    GestionarBonos:           boolean;
    GestionarCopagos:         boolean;
    CrearCopagoAlRecibirBonos: boolean;
    createdAt:                null;
    updatedAt:                null;
}
