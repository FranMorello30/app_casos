import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { Vehiculo, VehiculosResponse } from '../models/vehiculos.response';

@Injectable({
    providedIn: 'root',
})
export class VehiculosService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private readonly _http: HttpClient) {}
    retornarVehiculos(): Observable<Vehiculo[]> {
        return this._http
            .get<VehiculosResponse>(`${this.baseUrl}/vehiculos`)
            .pipe(map((respuesta) => respuesta.vehiculos));
    }
    retornarVehiculo(vehiculo:string): Observable<Vehiculo> {
        return this._http
            .get<VehiculosResponse>(`${this.baseUrl}/vehiculos/${vehiculo}`)
            .pipe(map((respuesta) => respuesta.vehiculo));
    }
    crearVehiculo(formulario): Observable<Vehiculo> {
        return this._http
            .post<VehiculosResponse>(`${this.baseUrl}/vehiculos`, {...formulario})
            .pipe(map((respuesta) => respuesta.vehiculo));
    }
    actualizarVehiculo(id:string,formulario): Observable<Vehiculo> {
        return this._http
            .patch<VehiculosResponse>(`${this.baseUrl}/vehiculos/${id}`, {...formulario})
            .pipe(map((respuesta) => respuesta.vehiculo));
    }
}
