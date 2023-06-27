import { Component, OnInit, Output, EventEmitter, Inject,OnDestroy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Imagen } from '@shared/models/imagen.model';
import Swal from 'sweetalert2';

import { UploadService } from './upload.service';


@Component({
    selector: 'upload-archivo',
    templateUrl: './upload-archivo.component.html',
})

export class UploadArchivoComponent {
    //@Output() archivosSubidos$: EventEmitter<any[]> =  new EventEmitter();
    @Output() files = new EventEmitter<Imagen[]>();
    @Input() titulo: string;
    public subiendo = false;
    public archivosSubidos = [];
    public rutaPdf = '';


    public archivos: any = [];
    constructor(
        private _sanitizer: DomSanitizer,
        private _uploadService: UploadService
    ) {}


    public capturarFile(event): void {
        this.archivos = [];
        const archivo = event.target.files[0];
        this.archivos.push(archivo);

        if(!event){
            return;
       }
       this.subirArchivo();
    }
    public borrarArchivoSubido(archivo: string): void {
        this._uploadService.borrarArchivo(archivo).subscribe();

        const filtrado = this.archivosSubidos.filter(
            (item) => item.nombre !== archivo
        );
        this.archivosSubidos = filtrado;
        this.files.emit(this.archivosSubidos);
    }
    public verArchivo(ruta: string) {
        this.rutaPdf = ruta;
        /*this.extraerBase64(archivo).then((imagen: any) => {
            this.previsualizacion = imagen.base;
            const base = this.previsualizacion.split(',');
            console.log(base[0])

                const fileblob = this.base64toBlob(base[1], 'application/pdf');
                const url = window.URL.createObjectURL(fileblob);
                this.rutaPdf = url;

        });*/
    }
    public ocultarVistaPrevia() {
        this.rutaPdf = '';
    }
    private subirArchivo(): void {
        if (this.archivos.length > 0) {
            this.subiendo = true;
            try {
                const formularioDeDatos = new FormData();
                this.archivos.forEach((archivo) => {
                    formularioDeDatos.append('file', archivo);
                });

                this._uploadService.uploadArchivo(formularioDeDatos).subscribe(
                    (archivo) => {
                        this.subiendo = false;
                        console.log(archivo)
                        this.archivosSubidos.push(archivo.nombre);
                        this.files.emit(this.archivosSubidos);
                    },
                    (err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            titleText: err.error.msg,
                        });
                    }
                );
            } catch (error) {
                console.warn('ERROR', error);
            }
        }
    }
    private base64toBlob(base64Data: string, contentType: string): Blob {
        contentType = contentType || '';
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        const byteArrays = new Array(slicesCount);

        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, bytesLength);

            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }
    private extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
        try {
            const unsafeImg = window.URL.createObjectURL($event);
            const image = this._sanitizer.bypassSecurityTrustUrl(unsafeImg);
            const reader = new FileReader();
            reader.readAsDataURL($event);
            reader.onload = () => {
                resolve({
                    base: reader.result,
                });
            };
            reader.onerror = (error) => {
                resolve({
                    blob: $event,
                    image,
                    base: null,
                });
            };
        } catch (error) {
            return null;
        }
    });
}

/**
 * public capturarFile2(event, cuenta?: Cuentas): void {
        this.archivos = [];

        const archivo = event.target.files[0];
        //cuenta.Pdf = archivo.name;
        this.archivos.push(archivo);
        this.extraerBase64(archivo).then((imagen: any) => {
            this.previsualizacion = imagen.base;

            const base = this.previsualizacion.split(',');
            const fileblob = this.base64toBlob(base[1], 'application/pdf');
            const url = window.URL.createObjectURL(fileblob);
            this.ruta = url;
        });
        if (cuenta) {
            this.subirArchivo2(cuenta);
        } else {
            this.cuentas.forEach((cuenta) => {
                this.subirArchivo2(cuenta);
            });
        }
    }
    private subirArchivo2(cuenta: Cuentas): void {
        if (this.archivos.length > 0) {
            try {
                const formularioDeDatos = new FormData();
                this.archivos.forEach((archivo) => {
                    formularioDeDatos.append('archivo', archivo);
                });

                this._uploadService.uploadArchivo(formularioDeDatos).subscribe(
                    (nombre) => {
                        cuenta.comprobante = nombre;
                    },
                    (err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            titleText: err.error.msg,
                        });
                    }
                );
            } catch (error) {
                console.warn('ERROR', error);
            }
        }
    }
 */
