import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { Persona, PersonaResponse,  } from '../models/persona.response';

@Injectable({
    providedIn: 'root',
})
export class PersonasService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}
    retornarPersonas(): Observable<Persona[]> {
        return this._http
            .get<PersonaResponse>(`${this.baseUrl}/personas`)
            .pipe(map((respuesta) => respuesta.personas));
    }
    retornarPersona(idPersona: string): Observable<Persona> {
        return this._http
            .get<PersonaResponse>(`${this.baseUrl}/personas/${idPersona}`)
            .pipe(map((respuesta) => respuesta.persona));
    }
    crearPersona(formulario): Observable<Persona> {
        return this._http
            .post<any>(`${this.baseUrl}/personas`, { ...formulario })
            .pipe(map((respuesta) => respuesta.persona));
    }
    actualizarPersona(id:string,formulario): Observable<Persona> {
        return this._http
            .patch<any>(`${this.baseUrl}/personas/${id}`, { ...formulario })
            .pipe(map((respuesta) => respuesta.persona));
    }
}
