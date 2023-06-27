import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { User, UsersResponse } from '../models/users';

@Injectable({
    providedIn: 'root',
})
export class ConfiguracionService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}

    buscarUsuarios(): Observable<User[]> {
        return this._http
            .get<UsersResponse>(`${this.baseUrl}/auth/users`)
            .pipe(map((respuesta) => respuesta.users));
    }

    crearUsuario(formulario): Observable<User[]> {
        return this._http
            .post<UsersResponse>(`${this.baseUrl}/auth/users`, {...formulario})
            .pipe(map((respuesta) => respuesta.users));
    }
    cambiarRolUsuario(id: string, rol: string): Observable<User[]> {
        return this._http
            .patch<UsersResponse>(`${this.baseUrl}/auth/users/${id}`, {rol})
            .pipe(map((respuesta) => respuesta.users));
    }
    borrarUsuario(id: string): Observable<User[]> {
        return this._http
            .delete<UsersResponse>(`${this.baseUrl}/auth/users/${id}`)
            .pipe(map((respuesta) => respuesta.users));
    }
}
