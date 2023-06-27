import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizacionesService } from './services/organizaciones.service';
import { Organizacion } from './models/organizaciones.response';
import Swal from 'sweetalert2';
import { Imagen } from '@shared/models/imagen.model';
import { ExcelService } from '@shared/services/excel.service';
import { UserService } from '@core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { DefinicionesService } from '@shared/services/definiciones.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-tabla-organizaciones',
    templateUrl: './tabla-organizaciones.component.html',
    styles: [
        `
            table {
                width: 100%;
            }
        `,
    ],
})
export class TablaOrganizacionesComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    public tabIndice = 0;
    public tabActual = 'Formulario';
    public tituloVentana = 'Organizaciones';
    public columns: string[] = [
        'tipo',
        'nombre',
        'propietario',
        'telefono',
        'acciones',
    ];
    public tabla: MatTableDataSource<any>;
    public formulario: UntypedFormGroup;
    listaOrganizaciones = [
        'Empresa',
        'Banda Criminal',
        'Ong',
        'Organismo internacional',
    ];
    archivosSubidos: string[] = [];
    public buscar: string;
    private dataExport = [];
    public usuario: Usuario;
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private _data: { organizacion: string; origen: string },
        private readonly _formBuilder: UntypedFormBuilder,
        public readonly matDialogRef: MatDialogRef<TablaOrganizacionesComponent>,
        private readonly _excelService: ExcelService,
        private readonly _organizacionService: OrganizacionesService,
        private readonly usuarioService: UserService,
        public readonly defService: DefinicionesService
    ) {}

    ngOnInit(): void {
        this.crearFormulario();
        this.retornarOrganizaciones();
        if (this._data.organizacion) {
            this.editarFormulario();
        }
        this.usuarioService.user$.subscribe((usuario) => {
            this.usuario = usuario;
        });
    }
    public cerrarVentana() {
        this.matDialogRef.close();
    }
    public seleccionar(organizacion: Organizacion) {
        this.matDialogRef.close(organizacion);
    }
    private retornarOrganizaciones() {
        this._organizacionService
            .retornarOrganizaciones()
            .subscribe((organizaciones) => {
                this.tabla = new MatTableDataSource(organizaciones);
                this.tabla.paginator = this.paginator;
                this.tabla.sort = this.sort;
                organizaciones.forEach((element) => {
                    const { nombre, nro_doc, tipo, fecha } = element;
                    this.dataExport.push({
                        nombre,
                        nro_doc,
                        tipo,
                        fecha,
                    });
                });
            });
    }
    private crearFormulario(): void {
        this.formulario = this._formBuilder.group({
            propietario: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
            observaciones: [''],
            nro_doc: ['', [Validators.required]],
            telefono: [''],
            imagenes: [[]],
            currentImageIndex: [0],
        });
    }
    private editarFormulario(): void {
        this._organizacionService
            .retornarOrganizacion(this._data.organizacion)
            .subscribe((organizacion) => {
                this.formulario.patchValue({
                    propietario: organizacion.propietario,
                    nro_doc: organizacion.nro_doc,
                    telefono: organizacion.telefono,
                    nombre: organizacion.nombre,
                    tipo: organizacion.tipo,
                    observaciones: organizacion.observaciones,
                    imagenes: organizacion.imagenes
                        ? organizacion.imagenes
                        : [],
                });
                this.archivosSubidos = organizacion.imagenes ? organizacion.imagenes : [];
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
                if (this._data.organizacion) {
                    this._organizacionService
                        .actualizarOrganizacion(
                            this._data.organizacion,
                            this.formulario.value
                        )
                        .subscribe((resp) => {
                            if (this._data.origen === 'crud') {
                                this.matDialogRef.close();
                                Swal.fire({
                                    title: 'Registro actualizado correctamente',
                                    icon: 'success',
                                });
                            } else {
                                this.seleccionar(resp);
                            }
                        });
                } else {
                    this._organizacionService
                        .crearOrganizacion(this.formulario.value)
                        .subscribe((resp) => {
                            this.seleccionar(resp);
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
        if(this._data.organizacion){
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
        this._excelService.exportExcel(this.dataExport, 'oranizaciones');
    }
    public exportPdf() {
        this._excelService.exportPdf(
            this.dataExport,
            ['nombre', 'nro_doc', 'tipo', 'fecha'],
            'oranizaciones'
        );
    }
    verRegistro(organizacion: Organizacion) {
        this._data.organizacion = organizacion.id;
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
