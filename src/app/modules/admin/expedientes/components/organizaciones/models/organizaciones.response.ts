export interface OrganizacionesResponse {
    organizaciones: Organizacion[];
    organizacion: Organizacion;
}

export interface Organizacion {
    propietario: string
    id:            string;
    nombre:        string;
    tipo:          string;
    nro_doc:       string;
    fecha:         Date;
    telefono:      string;
    observaciones: string;
    imagenes: null;
}
