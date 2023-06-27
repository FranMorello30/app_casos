import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Paginacion } from '@shared/services/paginacion.service';
import Swal from 'sweetalert2';
import { Armamento } from './models/armamentos.response';
import { ArmamentosService } from './services/armamentos.service';
import { Imagen } from '@shared/models/imagen.model';
import { ExcelService } from '@shared/services/excel.service';
import { UserService } from '@core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { DefinicionesService } from '@shared/services/definiciones.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-tabla-armamentos',
    templateUrl: './tabla-armamentos.component.html',
    providers: [{ provide: MatPaginatorIntl, useClass: Paginacion }],
    styles: [
        `
            table {
                width: 100%;
            }
        `,
    ],
})
export class TablaArmamentosComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    public tabIndice = 0;
    public tabActual = 'Formulario';
    public tituloVentana = 'Armamentos';
    public columns: string[] = ['marca', 'modelo', 'serial', 'acciones'];
    public tabla: MatTableDataSource<any>;
    public formulario: UntypedFormGroup;
    dataExport = [];
    archivosSubidos: string[] = [];
    public buscar: string;
    public usuario: Usuario;
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private _data: { armamento: string; origen: string },
        private readonly _formBuilder: UntypedFormBuilder,
        public readonly matDialogRef: MatDialogRef<TablaArmamentosComponent>,
        private readonly _armamentosService: ArmamentosService,
        private readonly _excelService: ExcelService,
        private readonly usuarioService: UserService,
        public readonly defService: DefinicionesService
    ) {}

    ngOnInit(): void {
        this.crearFormulario();
        this.retornarArmamentos();
        if (this._data.armamento) {
            this.editarFormulario();
        }
        this.usuarioService.user$.subscribe((usuario) => {
            this.usuario = usuario;
        });
    }
    public cerrarVentana() {
        this.matDialogRef.close();
    }
    public seleccionar(armas: Armamento) {
        this.matDialogRef.close(armas);
    }
    private retornarArmamentos() {
        this._armamentosService.retornarArmamentos().subscribe((inmuebles) => {
            this.tabla = new MatTableDataSource(inmuebles);
            this.tabla.paginator = this.paginator;
            this.tabla.sort = this.sort;
            inmuebles.forEach((element) => {
                const { marca, modelo, serial, procedencia, fecha } = element;
                this.dataExport.push({
                    marca,
                    modelo,
                    serial,
                    procedencia,
                    fecha,
                });
            });
        });
    }
    private crearFormulario(): void {
        this.formulario = this._formBuilder.group({
            marca: ['',[Validators.required]],
            modelo: ['',[Validators.required]],
            serial: ['',[Validators.required]],
            procedencia: ['',[Validators.required]],
            observaciones: [''],
            imagenes: [[]],
            currentImageIndex: [0],
        });
    }
    private editarFormulario(): void {
        this._armamentosService
            .retornarArmamento(this._data.armamento)
            .subscribe((armamento) => {
                this.formulario.patchValue({
                    marca: armamento.marca,
                    modelo: armamento.modelo,
                    serial: armamento.serial,
                    procedencia: armamento.procedencia,
                    observaciones: armamento.observaciones,
                    imagenes: armamento.imagenes ? armamento.imagenes : [],
                });
                this.archivosSubidos = armamento.imagenes ? armamento.imagenes : [];
            });
    }
    public grabar() {
        Swal.fire({
            title: 'Listo para grabar desea continuar?',
            icon: 'question',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                if (this._data.armamento) {
                    this._armamentosService
                        .actualizarArmamento(
                            this._data.armamento,
                            this.formulario.value
                        )
                        .subscribe((result) => {
                            if (this._data.origen === 'crud') {
                                this.matDialogRef.close();
                                Swal.fire({
                                    title: 'Registro actualizado correctamente',
                                    icon: 'success',
                                });
                            } else {
                                this.seleccionar(result);
                            }
                        });
                } else {
                    this._armamentosService
                        .crearArmamento(this.formulario.value)
                        .subscribe({
                            next : (result) => {
                                this.seleccionar(result);
                            },
                            error: (err) => {
                                console.warn(err);
                                Swal.fire({
                                    icon: "warning",
                                    title: err.error.message,
                                    allowOutsideClick: false,
                                });
                            },
                        });
                }
            }
        });
    }
    cycleImages(forward: boolean = true): void {
        // Get the image count and current image index
        const count = this.formulario.get('imagenes').value.length;
        const currentIndex = this.formulario.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if (forward) {
            this.formulario.get('currentImageIndex').setValue(nextIndex);
        }
        // If cycling backwards...
        else {
            this.formulario.get('currentImageIndex').setValue(prevIndex);
        }

        console.log(this.formulario.get('currentImageIndex').value);
    }
    public recibirArchivo(archivos: string[]) {
        if(this._data.armamento){
            if(this.archivosSubidos.length === 0){
                this.archivosSubidos = archivos;
            }else{
                archivos.forEach((img)=>{
                    const existe = this.archivosSubidos.filter(p => p === img)
                    if(existe.length === 0)
                        this.archivosSubidos.push(img)
                })
            }
        }else{
            this.archivosSubidos = archivos;
        }

        this.formulario.patchValue({
            imagenes: this.archivosSubidos
        })
    }
    public busquedaTabla(): void {
        this.tabla.filter = this.buscar.trim().toLowerCase();

        if (this.tabla.paginator) {
            this.tabla.paginator.firstPage();
        }
    }
    public exportExcel() {
        this._excelService.exportExcel(this.dataExport, 'armamentos');
    }
    public exportPdf() {
        this._excelService.exportPdf(
            this.dataExport,
            ['marca', 'modelo', 'serial', 'procedencia', 'fecha'],
            'armamentos'
        );
    }
    public verRegistro(armamento: Armamento) {
        this._data.armamento = armamento.id;
        this._data.origen = 'crud';
        this.editarFormulario();
        this.tabIndice = 0;
        this.tabActual = 'Formulario';
    }
    public cambiarTab(tabChangeEvent: MatTabChangeEvent): void {
        this.tabIndice = tabChangeEvent.index;
        this.tabActual = tabChangeEvent.tab.textLabel;
    }
}
