export interface PersonaResponse {
    personas: Persona[];
    persona: Persona;
}

export interface Persona {
    id:                   string;
    alias:                string;
    nombres:              string;
    apellidos:            string;
    tipo_doc:             string;
    num_doc:              string;
    edad:                 number;
    fec_nacimiento:       Date;
    direccion:            string;
    direccion_secundaria: string;
    telefono:             string;
    correo:               string;
    trabajo:              string;
    direccion_trabajo:    string;
    observaciones:        string;
    fecha:                Date;
    imagenes:             null;
    redes_sociales?:      null;
    nacionalidad:         string;
}

// export interface PersonaResponse {
//     data: Persona;
// }

// export interface PersonasResponse {
//     data: Persona[];
//     meta: Meta;
// }

// export interface Persona {
//     type:       string;
//     attributes: Attributes;
//     id:         string;
// }

// export interface Attributes {
//     alias:                string;
//     nombres:              string;
//     apellidos:            string;
//     tipo_doc:             string;
//     num_doc:              string;
//     edad:                 number;
//     fec_nacimiento:       Date;
//     direccion:            string;
//     direccion_secundaria: string;
//     telefono:             string;
//     correo:               string;
//     trabajo:              string;
//     direccion_trabajo:    string;
//     comentarios:          string;
//     fecha_creacion:       Date;
// }

// export interface Meta {
//     page:            number;
//     take:            number;
//     itemCount:       number;
//     pageCount:       number;
//     hasPreviousPage: boolean;
//     hasNextPage:     boolean;
// }
