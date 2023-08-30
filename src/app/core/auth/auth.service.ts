/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';

//import { Usuario } from '@shared/models/usuario.model';
import { LoginResponse } from './interfaces/login-response';

const base_url = String(environment.baseUrl);

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    set accessToken(token: string) {
        sessionStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        const token = sessionStorage.getItem('accessToken') || '';

        if (token.trim().length === 0) {
            this._authenticated = false;
            this.signOut();
            return;
        }

        if (token == 'undefined') {
            this._authenticated = false;
            this.signOut();
            return;
        }

        if (token == undefined) {
            this._authenticated = false;
            this.signOut();
            return;
        }

        return token;
    }

    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    signIn(credenciales: {
        username: string;
        password: string;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(`${base_url}/auth/login`, {
                username: credenciales.username,
                password: credenciales.password,
            })
            .pipe(
                switchMap((response: any) => {
                    const token = response.token;
                    this.accessToken = token;
                    this._authenticated = true;
                    this._userService.user = {
                        id: response.id,
                        username: response.username,
                        nombre: response.nombre,
                        apellido: response.apellido,
                        telefono: response.telefono,
                        correo: response.correo,
                        cargo: response.cargo,
                        dependencia: response.dependencia,
                        avatar: response.avatar,
                        rol: response.rol,
                        estado: '',
                    };
                    return of(response);
                })
            );
    }

    signInUsingToken(): Observable<any> {
        // Renew token
        //this._authenticated = true;

        return this._httpClient.get(`${base_url}/auth/check-status`).pipe(
            catchError(() =>
                // Return false
                of(false)
            ),
            switchMap((response: any) => {
                //const token = response.token;
                //this.accessToken = token;
                this._authenticated = true;
                this._userService.user = {
                    id: response.id,
                    username: response.username,
                    nombre: response.nombre,
                    apellido: response.apellido,
                    telefono: response.telefono,
                    correo: response.correo,
                    cargo: response.cargo,
                    dependencia: response.dependencia,
                    avatar: response.avatar,
                    rol: response.rol,
                    estado: '',
                };
                return of(response);
            })
        );
    }

    signOut(): Observable<any> {
        /*this._httpClient
            .patch(`${base_url}/auth/estado`, { estado: 'desconectado' })
            .subscribe((resp) => {*/
        sessionStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;
        //  });
        // Remove the access token from the local storage
        //
        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post(`${base_url}/auth/create`, {
            email: user.email,
            password: user.password,
            nombre: user.name,
        });
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post(
            `${base_url}/auth/unlock-session`,
            credentials
        );
    }

    lockSession(estado: string): Observable<any> {
        return this._httpClient.post(`${base_url}/auth/lock-session`, {
            estado,
        });
    }
    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
