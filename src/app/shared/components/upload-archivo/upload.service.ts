import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from '@shared/interfaces/mensaje';
import { map } from 'rxjs/operators';
import { Imagen } from '@shared/models/imagen.model';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {}

    uploadArchivo(archivo: FormData): Observable<Imagen> {
        return this.http.post<Imagen>(`${this.baseUrl}/uploads`, archivo);
    }
    borrarArchivo(archivo: string): Observable<string> {
        return this.http
            .delete<Mensaje>(`${this.baseUrl}/uploads/${archivo}`)
            .pipe(
                map(
                    (respuesta) =>
                        respuesta.msg
                )
            );
    }
}
