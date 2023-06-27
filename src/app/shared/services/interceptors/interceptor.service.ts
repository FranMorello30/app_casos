import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
//
@Injectable({
    providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
    constructor(private _authService: AuthService,private _router: Router) {}
    get token(): string {
        return localStorage.getItem('accessToken') || '';
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let newReq = req.clone();

        if (this.token === undefined || this.token === 'undefined') {
            this._router.navigate(['/login']);
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this._authService.accessToken}`,
        });


        if (this._authService.accessToken) {
            newReq = req.clone({headers});
        }

        return next.handle(newReq).pipe(
            catchError((error) => {

                // Catch "401 Unauthorized" responses
                if ( error instanceof HttpErrorResponse && error.status === 401 )
                {
                    // Sign out
                    this._authService.signOut();

                    // Reload the app
                    location.reload();
                }

                return throwError(error);
            })
        );
    }

}
