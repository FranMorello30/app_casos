/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Usuario } from '@shared/models/usuario.model';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: '  YYYY/MM/DD',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Injectable({
    providedIn: 'root',
})
export class DefinicionesService {

    estados = [
        'Amazonas',
        'Anzoátegui',
        'Apure',
        'Aragua',
        'Barinas',
        'Bolívar',
        'Carabobo',
        'Cojedes',
        'Delta Amacuro',
        'Distrito Capital',
        'Falcón',
        'Guárico',
        'Lara',
        'Mérida',
        'Miranda',
        'Monagas',
        'Nueva Esparta',
        'Portuguesa',
        'Sucre',
        'Táchira',
        'Trujillo',
        'Vargas',
        'Yaracuy',
        'Zulia',
    ];
    private base_url = environment.baseUrl;
    public paises: string[] = [];

    constructor(private _http: HttpClient, private _decimalPipe: DecimalPipe) {}

    inicializarApp() {
        //this.retornarPaises();
    }
    private retornarPaises() {
        this._http
            .get(`https://restcountries.com/v3.1/all`)
            .pipe(
                map((resp: any[]) => {
                    resp.forEach((paises) => {
                        const pais = paises.translations.spa.common;
                        this.paises.push(pais);
                    });

                    this.paises.sort();
                })
            )
            .subscribe();
    }
    public definir(sigla: string, parametro = ''): Observable<any> {
        return this._http.get(
            `${this.base_url}/definiciones/sigla/proced/${sigla}`
        );
    }
    public fDefinir(sigla: string): Observable<any> {
        return this._http.get(
            `${this.base_url}/definiciones/sigla/fun/${sigla}`
        );
    }
    public formatoNumero(num: number) {
        return this._decimalPipe.transform(num, '1.0');
    }
    public reemplazarCaracter(search: string, replace: string, sujeto: any) {
        const result = [];
        const _string = sujeto.toLowerCase();
        const _search = search.toLowerCase();
        let start = 0;
        let match;
        const length = _search.length;
        while ((match = _string.indexOf(_search, start)) >= 0) {
            result.push(sujeto.slice(start, match));
            start = match + length;
        }
        result.push(sujeto.slice(start));

        return result.join(replace);
    }
    public retornarNomMes(mes: number): string {
        switch (mes) {
            case 1:
                return 'ENE';
                break;
            case 2:
                return 'FEB';
                break;
            case 3:
                return 'MAR';
                break;
            case 4:
                return 'ABR';
                break;
            case 5:
                return 'MAY';
                break;
            case 6:
                return 'JUN';
                break;
            case 7:
                return 'JUL';
                break;
            case 8:
                return 'AGO';
                break;
            case 9:
                return 'SEP';
                break;
            case 10:
                return 'OCT';
                break;
            case 11:
                return 'NOV';
                break;
            case 12:
                return 'DIC';
                break;
        }
    }
    public retornarUltAnios() {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const anios = [];
        for (let i = year; i >= year - 4; i--) {
            anios.push(i);
        }
        return anios;
    }
    public retornarMesFormateado(
        dia: number,
        mes: number,
        anio: number
    ): string {
        const mesBuscado = {
            1: 'Enero',
            2: 'Febrero',
            3: 'Marzo',
            4: 'Abril',
            5: 'Mayo',
            6: 'Junio',
            7: 'Julio',
            8: 'Agosto',
            9: 'Septiembre',
            10: 'Octubre',
            11: 'Noviembre',
            12: 'Diciembre',
        };
        return `${mesBuscado[mes]} ${dia}, ${anio}`;
    }
    public rolUsuario(usuario: Usuario): boolean
    {
        return  (usuario.rol === 'operador') ? false : true
    }
}
