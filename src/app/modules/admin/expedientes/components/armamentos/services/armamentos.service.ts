import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { ArmasResponse,
    Armamento } from '../models/armamentos.response';

@Injectable({
    providedIn: 'root',
})
export class ArmamentosService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}
    retornarArmamentos(): Observable<Armamento[]> {
        return this._http
            .get<ArmasResponse>(`${this.baseUrl}/armas`)
            .pipe(map((respuesta) => respuesta.armas));
    }
    retornarArmamento(arma:string): Observable<Armamento> {
        return this._http
            .get<ArmasResponse>(`${this.baseUrl}/armas/${arma}`)
            .pipe(map((respuesta) => respuesta.arma));
    }
    crearArmamento(formulario): Observable<Armamento> {
        return this._http
            .post<ArmasResponse>(`${this.baseUrl}/armas`, { ...formulario })
            .pipe(map((respuesta) => respuesta.arma));
    }
    actualizarArmamento(id: string,formulario): Observable<Armamento> {
        return this._http
            .patch<ArmasResponse>(`${this.baseUrl}/armas/${id}`, { ...formulario })
            .pipe(map((respuesta) => respuesta.arma));
    }
}
