import { Armamento } from "../components/armamentos/models/armamentos.response";
import { Inmueble } from "../components/inmuebles/models/inmuebles.response";
import { Organizacion } from "../components/organizaciones/models/organizaciones.response";
import { Persona } from "../components/personas/models/persona.response";
import { Vehiculo } from "../components/vehiculos/models/vehiculos.response";

export interface ExpedienteResponse {
    expediente: Expediente;
}

export interface Expediente {
    id:          string;
    nro:          string;
    fiscalia:     string;
    fiscal:     string;
    pieza:     string;
    juez:     string;
    nombre:     string;
    tribunal:     string;
    delito:       string;
    observaciones:  string;
    fecha_creacion:        Date;
    imagenes: string[];
    id_vehiculos: Vehiculo[];
    id_armas:     Armamento[];
    id_inmuebles: Inmueble[];
    id_personas:   Persona[];
    id_organizaciones: Organizacion[];
}
