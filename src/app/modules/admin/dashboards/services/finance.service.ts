import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { Totales } from '../models/totales.model';

@Injectable({
    providedIn: 'root',
})
export class FinanceService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private _http: HttpClient) {}

    retornarTotales(): Observable<Totales> {
        return this._http
            .get<Totales>(`${this.baseUrl}/bitacora/totales-creados`)
            .pipe(map((respuesta) => respuesta));
    }
}
