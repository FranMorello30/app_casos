export interface VehiculosResponse {
    vehiculos: Vehiculo[];
    vehiculo: Vehiculo;
}


export interface Vehiculo {
    id:                string;
    tipo:              string;
    placa:             string;
    serial_carroceria: string;
    serial_motor:      string;
    color:             string;
    modelo:            string;
    marca:             string;
    anio:              Date;
    custodia?: string;
    localizacion?: string;
    observaciones:     string;
    fecha_creacion:    Date;
    fecha_compra:    string;
    imagenes:          null;
    estado: string
}

