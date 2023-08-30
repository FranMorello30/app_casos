import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { Inmueble, InmueblesResponse } from '../models/inmuebles.response';
import { Estado, EstadosResponse } from '../models/estados.response';

@Injectable({
    providedIn: 'root',
})
export class InmueblesService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}
    retornarInmuebles(): Observable<any[]> {
        return this._http
            .get<any>(`${this.baseUrl}/inmuebles`)
            .pipe(map((respuesta) => respuesta.inmuebles));
    }
    retornarInmueble(inmueble: string): Observable<Inmueble> {
        return this._http
            .get<InmueblesResponse>(`${this.baseUrl}/inmuebles/${inmueble}`)
            .pipe(map((respuesta) => respuesta.inmueble));
    }
    crearInmueble(formulario): Observable<Inmueble> {
        return this._http
            .post<InmueblesResponse>(`${this.baseUrl}/inmuebles`, { ...formulario })
            .pipe(map((respuesta) => respuesta.inmueble));
    }
    actualizarInmueble(id: string,formulario): Observable<Inmueble> {
        return this._http
            .patch<InmueblesResponse>(`${this.baseUrl}/inmuebles/${id}`, { ...formulario })
            .pipe(map((respuesta) => respuesta.inmueble));
    }
    retornarEstados(): Observable<Estado[]> {
        return this._http
            .get<EstadosResponse>(`${this.baseUrl}/definiciones/estados`)
            .pipe(map((respuesta) => respuesta.estados));
    }
}
