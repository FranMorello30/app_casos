import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Inmueble } from './models/inmuebles.response';
import { InmueblesService } from './services/inmuebles.service';
import { Paginacion } from '@shared/services/paginacion.service';
import Swal from 'sweetalert2';
import { Imagen } from '@shared/models/imagen.model';
import { ExcelService } from '@shared/services/excel.service';
import { UserService } from '@core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { DefinicionesService } from '@shared/services/definiciones.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-tabla-inmuebles',
    templateUrl: './tabla-inmuebles.component.html',
    providers: [{ provide: MatPaginatorIntl, useClass: Paginacion }],
    styles: [
        `
            table {
                width: 100%;
            }
        `,
    ],
})
export class TablaInmueblesComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    public tabIndice = 0;
    public tabActual = "Formulario";
    public tituloVentana = 'Inmuebles';
    public tabla: MatTableDataSource<Inmueble>;
    public buscar: string;
    public formulario: UntypedFormGroup;
    public columns: string[] = [
        'tipo',
        'propietario',
        'estado',
        'municipio',
        'direccion',
        'telefono',
        'acciones'
    ];
    public listoTipo = [
        'Casa',
        'Apartamento',
        'Finca',
        'Quinta',
        'Town House',
        'Terreno',
        'Granja',
        'Hotel',
        'Centro Comercial',
        'Clinica',
        'Empresa',
    ];
    public estados = [
        "Amazonas",
        "Anzoátegui",
        "Apure",
        "Aragua",
        "Barinas",
        "Bolívar",
        "Carabobo",
        "Cojedes",
        "Delta Amacuro",
        "Falcón",
        "Guárico",
        "Lara",
        "Mérida",
        "Miranda",
        "Monagas",
        "Nueva Esparta",
        "Portuguesa",
        "Sucre",
        "Táchira",
        "Trujillo",
        "Vargas",
        "Yaracuy",
        "Zulia",
    ];
    public listaEstado = ['Asegurado', 'No Asegurado'];
    public archivosSubidos: string[]= [];
    private dataExport = [];
    public usuario: Usuario;
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private _data: { inmueble: string, origen: string },
        private readonly _formBuilder: UntypedFormBuilder,
        private readonly _excelService: ExcelService,
        private readonly _inmueblesService: InmueblesService,
        public readonly matDialogRef: MatDialogRef<TablaInmueblesComponent>,
        private readonly usuarioService: UserService,
        public readonly defService: DefinicionesService
    ) {}

    ngOnInit(): void {
        this.retornarInmuebles();
        this.crearFormulario();
        if (this._data.inmueble) {
            this.editarFormulario();
        }
        this.usuarioService.user$.subscribe(usuario =>{
            this.usuario = usuario;
        })
    }
    private crearFormulario(): void {
        this.formulario = this._formBuilder.group({
            direccion: ['', [Validators.required]],
            propietario: [''],
            telefono: [''],
            estado: ['', [Validators.required]],
            municipio: ['', [Validators.required]],
            fecha_compra: ['', [Validators.required]],
            tipo:'',
            estatus:'',
            nro:'',
            imagenes: [[]],
            currentImageIndex: [0],
            observaciones:[]
        });
    }
    private editarFormulario(): void {
        this._inmueblesService
            .retornarInmueble(this._data.inmueble)
            .subscribe((inmueble) => {
                this.formulario.patchValue({
                    direccion: inmueble.direccion,
                    observaciones: inmueble.observaciones,
                    nro:inmueble.nro,
                    estatus:inmueble.estatus,
                    propietario: inmueble.propietario,
                    telefono: inmueble.telefono,
                    estado: inmueble.estado,
                    fecha_compra: inmueble.fecha_compra,
                    tipo:inmueble.tipo,
                    municipio: inmueble.municipio,
                    imagenes: inmueble.imagenes ? inmueble.imagenes : [],
                });
                this.archivosSubidos = inmueble.imagenes ? inmueble.imagenes : [];
            });
    }
    private retornarInmuebles() {
        this._inmueblesService.retornarInmuebles().subscribe((inmuebles) => {
            console.log(inmuebles)
            this.tabla = new MatTableDataSource(inmuebles);
            this.tabla.paginator = this.paginator;
            this.tabla.sort = this.sort;
            inmuebles.forEach((element) => {
                const {
                    tipo,
                    propietario,
                    estado,
                    municipio,
                    direccion,
                } = element;
                this.dataExport.push({
                    tipo,
                    propietario,
                    estado,
                    municipio,
                    'dirección':direccion

                });
            })
        })
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


                if(this._data.inmueble){
                    this._inmueblesService
                    .actualizarInmueble(this._data.inmueble,this.formulario.value)
                    .subscribe((result) => {
                        if(this._data.origen === 'crud'){
                            this.matDialogRef.close();
                            Swal.fire({
                                title: 'Registro actualizado correctamente',
                                icon: 'success',
                            })
                        }else{
                            this.seleccionar(result);
                        }
                    });
                }else{
                    this._inmueblesService
                    .crearInmueble(this.formulario.value)
                    .subscribe((result) => {
                        this.seleccionar(result);
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

    }
    public busquedaTabla(): void {
        this.tabla.filter = this.buscar.trim().toLowerCase();

        if (this.tabla.paginator) {
            this.tabla.paginator.firstPage();
        }
    }
    public cerrarVentana() {
        this.matDialogRef.close();
    }
    public recibirArchivo(archivos: string[]) {
        if(this._data.inmueble){
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

    public seleccionar(inmuebles: Inmueble) {
        this.matDialogRef.close(inmuebles);
    }
    public exportExcel(){
        this._excelService.exportExcel(this.dataExport, 'inmuebles');
    }
    public exportPdf(){
        this._excelService.exportPdf(
            this.dataExport,
            [
                'tipo',
                'propietario',
                'estado',
                'municipio',
                'dirección'
            ],
            'inmuebles'
        );
    }
    verRegistro(inmueble: Inmueble){
        this._data.inmueble = inmueble.id;
        this._data.origen = 'crud';
        this.editarFormulario();
        this.tabIndice = 0;
        this.tabActual = 'Formulario'
    }
    public cambiarTab(tabChangeEvent: MatTabChangeEvent): void {
        this.tabIndice = tabChangeEvent.index;
        this.tabActual = tabChangeEvent.tab.textLabel;
    }
}
