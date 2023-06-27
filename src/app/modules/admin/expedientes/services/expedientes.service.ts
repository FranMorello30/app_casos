import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { ExpedienteResponse, Expediente } from '../models/expediente.model';


@Injectable({
    providedIn: 'root',
})
export class ExpedientesService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}

    crearExpediente(formulario): Observable<any> {
        return this._http
            .post(`${this.baseUrl}/expedientes`, { ...formulario })
            .pipe(map((respuesta) => respuesta));
    }
    retornarExpediente(expediente: string): Observable<Expediente> {
        return this._http
            .get<ExpedienteResponse>(`${this.baseUrl}/expedientes/${expediente}`)
            .pipe(map((respuesta) => respuesta.expediente));
    }
}
