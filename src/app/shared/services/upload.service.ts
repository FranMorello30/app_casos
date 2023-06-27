import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Mensaje } from "@shared/interfaces/mensaje";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    private readonly baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {}

    uploadArchivo(archivo: any): Observable<string> {
        return this.http
            .post<{
                nombre: string;
                nombreOriginal: string;
                ruta: string;
                size: number;
            }>(`${this.baseUrl}/uploads`, archivo)
            .pipe(map((archivo) => archivo.nombre));
    }
}
