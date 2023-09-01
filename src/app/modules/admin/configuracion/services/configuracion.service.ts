/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { User, UsersResponse } from '../models/users';
import { Historial } from '../models/historial';
import moment from 'moment';
import { lowerCase } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class ConfiguracionService {
    private readonly baseUrl = environment.baseUrl;
    private historial = {
        ACCESO: {
            title: 'Acceso',
            icono: 'heroicons_outline:login',
            contenido: (bitacora: Historial) => `<div>
                        <span class="font-bold">Contenido: </span>
                        ${bitacora.observaciones}
                </div>`,
        },
        BUSCAR: {
            title: 'Busqueda',
            icono: 'heroicons_outline:search',
            contenido: (bitacora: Historial) => `
                <div>
                        <span class="font-bold">Contenido: </span>
                        ${bitacora.observaciones}
                </div>`,
        },
        CONSULTA: {
            title: 'Consulta',
            icono: 'heroicons_outline:book-open',
            contenido: (bitacora: Historial) => `

            <div>
                <span class="font-bold">Contenido: </span>
                ${bitacora.observaciones}
            </div>`,
        },
        ACTUALIZAR: {
            title: 'Actualización',
            icono: 'mat_outline:edit',
            contenido: (bitacora: Historial) => `

            <div>
                <span class="font-bold">Contenido: </span>
                  Modulo  ${bitacora.tabla} fue actualizado
            </div>`,
        },
    };
    constructor(private readonly _http: HttpClient) {
        moment.locale('es');
    }

    buscarUsuarios(): Observable<User[]> {
        return this._http
            .get<UsersResponse>(`${this.baseUrl}/auth/users`)
            .pipe(map((respuesta) => respuesta.users));
    }

    crearUsuario(formulario): Observable<User[]> {
        return this._http
            .post<UsersResponse>(`${this.baseUrl}/auth/users`, {
                ...formulario,
            })
            .pipe(map((respuesta) => respuesta.users));
    }
    cambiarRolUsuario(id: string, rol: string): Observable<User[]> {
        return this._http
            .patch<UsersResponse>(`${this.baseUrl}/auth/users/${id}`, { rol })
            .pipe(map((respuesta) => respuesta.users));
    }
    borrarUsuario(id: string): Observable<User[]> {
        return this._http
            .delete<UsersResponse>(`${this.baseUrl}/auth/users/${id}`)
            .pipe(map((respuesta) => respuesta.users));
    }
    cierreSistema(): Observable<string> {
        return this._http
            .get<any>(`${this.baseUrl}/definiciones/cierre`)
            .pipe(map((respuesta) => respuesta.message));
    }
    periodoSistema(): Observable<number> {
        return this._http
            .get<any>(`${this.baseUrl}/definiciones/periodo`)
            .pipe(map((respuesta) => respuesta));
    }
    buscarHistorial(user: string): Observable<any> {
        return this._http
            .get<any>(`${this.baseUrl}/bitacora/${user}`)
            .pipe(map((respuesta) => this.moldearDatos(respuesta.historial)));
    }
    moldearDatos(bitacoras: Historial[]): any[] {
        // console.log(bitacoras)

        const activities = [];
        bitacoras.forEach((bitacora) => {
            const fechaBit = moment(bitacora.fecha_creacion).format('LLL');

            activities.push({
                id: bitacora.id,
                tipo: this.historial[bitacora.accion].title,
                icon: this.historial[bitacora.accion].icono,
                description: this.historial[bitacora.accion].title,
                date: fechaBit,
                link: 'link',
                linkedContent: '',
                useRouter: true,
                extraContent: `${this.historial[bitacora.accion].contenido(
                    bitacora
                )}
                `,
            });
        });
        return activities;
    }
}
