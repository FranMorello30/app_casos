/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Usuario } from '@shared/models/usuario.model';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _baseUrl = environment.baseUrl;
    private _user: ReplaySubject<Usuario> = new ReplaySubject<Usuario>(1);

    constructor(private _httpClient: HttpClient) {}

    set user(value: Usuario) {
        this._user.next(value);
    }

    get user$(): Observable<Usuario> {
        return this._user.asObservable();
    }

    get(): Observable<Usuario> {

        return this.user$;
        /*return this._httpClient.get<Usuario>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );*/
    }

    update(estado: string): Observable<any> {
        return this._httpClient
            .patch<Usuario>(`${this._baseUrl}/auth/estado`, { estado })
            .pipe(
                map((response) => {
                    console.log(response);
                    this._user.next(response);
                })
            );
    }
}
