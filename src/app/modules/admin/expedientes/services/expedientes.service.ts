import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { ExpedienteResponse, Expediente } from '../models/expediente.model';
import { Mensaje } from '@shared/interfaces/mensaje';


@Injectable({
    providedIn: 'root',
})
export class ExpedientesService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}

    actualizarExpediente(id: string,formulario): Observable<string> {
        return this._http
            .patch<Mensaje>(`${this.baseUrl}/expedientes/${id}`, { ...formulario })
            .pipe(map((respuesta) => respuesta.msg));
    }
    crearExpediente(formulario): Observable<Expediente> {
        return this._http
            .post<ExpedienteResponse>(`${this.baseUrl}/expedientes`, { ...formulario })
            .pipe(map((respuesta) => respuesta.expediente));
    }
    retornarExpediente(expediente: string): Observable<Expediente> {
        return this._http
            .get<ExpedienteResponse>(`${this.baseUrl}/expedientes/${expediente}`)
            .pipe(map((respuesta) => respuesta.expediente));
    }
}
