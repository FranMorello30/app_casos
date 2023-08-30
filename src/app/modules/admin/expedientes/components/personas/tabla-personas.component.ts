import { Component, OnInit, ViewChild, AfterViewInit, Inject, ChangeDetectorRef } from '@angular/core';
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from './models/persona.response';
import { PersonasService } from './services/personas.service';

import { Paginacion } from '@shared/services/paginacion.service';
import Swal from 'sweetalert2';
import { Imagen } from '@shared/models/imagen.model';

import { ExcelService } from '@shared/services/excel.service';
import { UserService } from '@core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { DefinicionesService } from '@shared/services/definiciones.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

//{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
@Component({
    selector: 'app-persona',
    templateUrl: './tabla-personas.component.html',
    providers: [
        { provide: MatPaginatorIntl, useClass: Paginacion },
    ],
    styles: [
        `
            table {
                width: 100%;
            }
        `,
    ],
})
export class TablaPersonasComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public tabIndice = 0;
    public tabActual = "Formulario";
    public tituloVentana = 'Personas';
    public idPersona: string;
    public buscar: string;
    public archivosSubidos:string[] = [];
    public formulario: UntypedFormGroup;
    public verFormulario = false;
    public columns: string[] = [
        'nombres',
        'num_doc',
        'edad',
        'telefono',
        'correo',
        'acciones'
    ];
    private dataExport = [];
    public usuario: Usuario;
    public socialNetworks = [
        "Facebook",
        "Twitter",
        "Instagram",
        "LinkedIn",
        "YouTube",
        "TikTok",
        "Pinterest",
        "Reddit",
        "Snapchat",
        "Discord",
    ];
    tiposDoc = ['CI', 'PASAPORTE', 'RIF', 'NIT', 'N/A'];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private _data: { persona: string; origen: string },
        public matDialogRef: MatDialogRef<TablaPersonasComponent>,
        private readonly _formBuilder: UntypedFormBuilder,
        private readonly _ref: ChangeDetectorRef,
        private readonly _excelService: ExcelService,
        private readonly _personasService: PersonasService,
        private readonly usuarioService: UserService,
        public readonly defService: DefinicionesService
    ) {}
        redesSociales = [];
    tablaPersonas = new MatTableDataSource<Persona>();
    public tablaRedes: MatTableDataSource<any>;
    public columnsRedes: string[] = [

        'tipo',
        'cuenta',
        'accion'
    ];
    ngOnInit(): void {
        this.retornarPersonas();
        this.crearFormulario();

        if(this._data.persona){
            this.editarFormulario();
        }
        this.usuarioService.user$.subscribe(usuario =>{
            this.usuario = usuario;
        })
    }
    private crearFormulario(): void {
        this.formulario = this._formBuilder.group({
            nombres: ['', [Validators.required]],
            apellidos: ['', [Validators.required]],
            tipo_doc: ['CI', [Validators.required]],
            num_doc: ['', [Validators.required]],
            edad: [0],
            fec_nacimiento: ['', [Validators.required]],
            alias: [''],
            direccion: ['', [Validators.required]],
            telefono: ['', [Validators.required]],
            correo: [''],
            nacionalidad: ['', [Validators.required]],
            trabajo: [''],
            direccion_trabajo: [''],
            url: [''],
            provide: [''],
            centro_reclusion: [{value: '', disabled:true}],
            estado: ['EN LIBERTAD' , [Validators.required]],
            delitos: [''],
            redes_sociales:[[]],
            imagenes: [[]],
            currentImageIndex: [0],
            observaciones:[''],
        });
    }
    private editarFormulario(): void {
        this._personasService.retornarPersona(this._data.persona).subscribe( persona =>{
            console.log(persona);
            //this.idPersona = persona.id;
            this.formulario.patchValue({
                nombres:persona.nombres,
                apellidos:persona.apellidos,
                tipo_doc:persona.tipo_doc,
                num_doc:persona.num_doc,
                edad:persona.edad,
                fec_nacimiento:persona.fec_nacimiento,
                alias:persona.alias,
                nacionalidad:persona.nacionalidad,
                direccion:persona.direccion,
                direccion_secundaria:persona.direccion_secundaria,
                telefono:persona.telefono,
                correo:persona.correo,
                trabajo:persona.trabajo,
                direccion_trabajo:persona.direccion_trabajo,
                observaciones:persona.observaciones,
                imagenes:(persona.imagenes) ? persona.imagenes: [],
                centro_reclusion:persona.centro_reclusion,
                estado:persona.estado,
                delitos:persona.delitos
            })
            this.redesSociales = persona.redes_sociales;
            this.archivosSubidos = (persona.imagenes) ? persona.imagenes: [];
        })

    }
    private retornarPersonas() {
        this._personasService.retornarPersonas().subscribe((personas) => {
            console.log(personas)
            this.tablaPersonas = new MatTableDataSource(personas);
            this.tablaPersonas.paginator = this.paginator;
            // this.tablaPersonas.sort = this.sort;
            personas.forEach((element) => {
                const {
                    nombres,
                    apellidos,
                    num_doc,
                    edad,
                    telefono,
                    correo
                } = element;
                this.dataExport.push({
                    nombres,
                    apellidos,
                    num_doc,
                    edad,
                    telefono,
                    correo
                });
            });
        });
    }
    public busquedaTabla(): void {

        this.tablaPersonas.filter = this.buscar.trim().toLowerCase();

        if (this.tablaPersonas.paginator) {
            this.tablaPersonas.paginator.firstPage();
        }
    }
    public cerrarVentana() {
        this.matDialogRef.close();
    }

    public cycleImages(forward: boolean = true): void {
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
    public agregarRedSocial(){
        const url = this.formulario.get('url').value;
        const provide = this.formulario.get('provide').value;
        if (provide.length > 0 && url.length > 0) {
            this.redesSociales.push({provide, url});
            //this.tablaRedes = new MatTableDataSource(this.redesSociales);
            //this._ref.detectChanges();
        }
        this.formulario.get('url').setValue('')
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

                this.formulario.patchValue({
                    redes_sociales:JSON.stringify(this.redesSociales)
                })
                //console.log(this.formulario.value)

                if(this._data.persona){
                    this._personasService
                    .actualizarPersona(this._data.persona,this.formulario.value)
                    .subscribe({
                        next : (result) => {
                            if(this._data.origen === 'crud'){
                                this.matDialogRef.close();
                                Swal.fire({
                                    title: 'Registro actualizado correctamente',
                                    icon: 'success',
                                })
                            }else{
                                this.seleccionar(result);
                            }
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

                }else{
                    this._personasService
                    .crearPersona(this.formulario.value)
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
                    }
                        /*(result) => {
                        this.seleccionar(result);
                        },(error) => {
                            console.warn(error.error.msg);
                            Swal.fire({
                                icon: "warning",
                                title: error.error.msg,
                                allowOutsideClick: false,
                            });
                        }*/
                        );
                }


            }
        });
    }
    public recibirArchivo(archivos: string[]) {

        if(this._data.persona){
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
    public seleccionar(persona: Persona) {
        this.matDialogRef.close(persona);
    }
    public verRegistro(persona: Persona){
        this._data.persona = persona.id;
        this._data.origen = 'crud';
        this.editarFormulario();
        this.tabIndice = 0;
        this.tabActual = 'Formulario'
    }
    public exportExcel(){
        this._excelService.exportExcel(this.dataExport, 'personas');
    }
    public exportPdf(){
        this._excelService.exportPdf(
            this.dataExport,
            [
                'nombres',
                'apellidos',
                'num_doc',
                'edad',
                'telefono',
                'correo'
            ],
            'personas'
        );
    }
    public cambiarTab(tabChangeEvent: MatTabChangeEvent): void {
        this.tabIndice = tabChangeEvent.index;
        this.tabActual = tabChangeEvent.tab.textLabel;
    }
    public tipoDoc({value}){
        //console.log(value)
        if(value === 'N/A'){
            //this.formulario.get('num_doc').disable()
            this.formulario.get('num_doc').setValue('--')
        }else{
            //this.formulario.get('num_doc').enable()
            this.formulario.get('num_doc').setValue('')
        }
    }
    public edoPersona({value}){
    console.log(value)
        if(value === 'EN LIBERTAD'){
            this.formulario.get('centro_reclusion').disable()
            this.formulario.get('centro_reclusion').setValue('')
        }else{
           this.formulario.get('centro_reclusion').enable()
           this.formulario.get('centro_reclusion').setValue('')
        }
        this._inicializarValidacion();
    }
    private _inicializarValidacion(): void {

        if(this.formulario.get('estado').value === 'PRIVADO DE LIBERTAD'){
            this.formulario
                .get("centro_reclusion")
                .setValidators([Validators.required]);
            this.formulario.get("centro_reclusion").updateValueAndValidity();
        }else{
            this.formulario.get("centro_reclusion").clearValidators();
            this.formulario.get("centro_reclusion").updateValueAndValidity();
        }
    }
}
