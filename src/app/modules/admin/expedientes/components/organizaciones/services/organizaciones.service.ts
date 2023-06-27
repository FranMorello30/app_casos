import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { Organizacion, OrganizacionesResponse } from '../models/organizaciones.response';

@Injectable({
    providedIn: 'root',
})
export class OrganizacionesService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}
    retornarOrganizaciones(): Observable<Organizacion[]> {
        return this._http
            .get<OrganizacionesResponse>(`${this.baseUrl}/organizaciones`)
            .pipe(map((respuesta) => respuesta.organizaciones));
    }
    retornarOrganizacion(arma:string): Observable<Organizacion> {
        return this._http
            .get<OrganizacionesResponse>(`${this.baseUrl}/organizaciones/${arma}`)
            .pipe(map((respuesta) => respuesta.organizacion));
    }
    crearOrganizacion(formulario): Observable<Organizacion> {
        return this._http
            .post<OrganizacionesResponse>(`${this.baseUrl}/organizaciones`, { ...formulario })
            .pipe(map((respuesta) => respuesta.organizacion));
    }
    actualizarOrganizacion(id: string,formulario): Observable<Organizacion> {
        return this._http
            .patch<OrganizacionesResponse>(`${this.baseUrl}/organizaciones/${id}`, { ...formulario })
            .pipe(map((respuesta) => respuesta.organizacion));
    }
}
