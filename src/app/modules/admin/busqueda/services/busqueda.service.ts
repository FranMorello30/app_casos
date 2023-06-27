import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { BusquedaResponse } from '../models/busqueda.model';
import { Expediente } from '@modules/admin/expedientes/models/expediente.model';
@Injectable({
    providedIn: 'root',
})
export class BusquedaService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}

    buscarExpedientes(termino: string): Observable<Expediente[]> {
        return this._http
            .get<BusquedaResponse>(`${this.baseUrl}/expedientes/search`, {
                params: {
                    value: termino,
                },
            })
            .pipe(map((respuesta) => respuesta.expedientes));
    }
}
