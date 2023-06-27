import { Expediente } from "@modules/admin/expedientes/models/expediente.model";

export interface BusquedaResponse {
    expedientes: Expediente[];
}
