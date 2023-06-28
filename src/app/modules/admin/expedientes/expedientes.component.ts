import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DefinicionesService } from '@shared/services/definiciones.service';
import { Paginacion } from '@shared/services/paginacion.service';
import Swal from 'sweetalert2';
import { ExpedientesService } from './services/expedientes.service';
import { Armamento } from './components/armamentos/models/armamentos.response';


import { TablaArmamentosComponent } from './components/armamentos/tabla-armamentos.component';
import { Inmueble } from './components/inmuebles/models/inmuebles.response';
import { TablaInmueblesComponent } from './components/inmuebles/tabla-inmuebles.component';
import { Persona } from './components/personas/models/persona.response';
import { TablaPersonasComponent } from './components/personas/tabla-personas.component';
import { Vehiculo } from './components/vehiculos/models/vehiculos.response';
import { TablaVehiculosComponent } from './components/vehiculos/tabla-vehiculos.component';
import { TablaOrganizacionesComponent } from './components/organizaciones/tabla-organizaciones.component';
import { Organizacion } from './components/organizaciones/models/organizaciones.response';
import { UserService } from '@core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { Imagen } from '@shared/models/imagen.model';
import { Expediente } from './models/expediente.model';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: '  YYYY/MM/DD',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
}; //#F1F5F9
@Component({
    selector: 'app-expedientes',
    templateUrl: './expedientes.component.html',
    styles: [
        `
            #header {
                /*background: url('/assets/images/fondos/azul.jpg') no-repeat 0
                    45%;
                background-size: cover;*/
            }
            table {
                width: 100%;
                .mat-header-cell,
                .mat-cell {
                    min-width: 90px;
                    box-sizing: border-box;
                }
            }
        `,
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: Paginacion },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpedientesComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    public tablaPer: MatTableDataSource<Persona>;
    public tablaIn: MatTableDataSource<Inmueble>;
    public tablaVe: MatTableDataSource<Vehiculo>;
    public tablaAr: MatTableDataSource<Armamento>;
    public tablaOr: MatTableDataSource<Organizacion>;

    archivosSubidos = [];
    public tablaPersonas: Persona[] = [];
    public tablaVehiculos: Vehiculo[] = [];
    public tablaInmuebles: Inmueble[] = [];
    public tablaArmentos: Armamento[] = [];
    public tablaOrganizaciones: Organizacion[] = [];
    public buscar: string;
    public usuario: Usuario;
    public expediente: Expediente;

    public piezasExpediente = ['Apertura', 'Allanamiento', 'Resultas', 'Deligencias']
    public columnsVehiculos: string[] = [
        'placa',
        'tipo',
        'marca',
        'modelo',
        'anio',
        'accion'
    ];
    public columnsInmuebles: string[] = [
        'propietario',
        'estado',
        'municipio',
        'telefono',
        'accion'
    ];
    public columnsArmamentos: string[] = ['marca', 'modelo', 'serial', 'accion'];
    public columnsOrganizacion: string[] = ['tipo','nombre','propietario','telefono' , 'accion'];
    public columnsPersonas: string[] = [
        'nombres',
        'num_doc',
        'edad',
        'telefono',

        'accion'
    ];

    public verFormulario = true;
    public formularioExpe: UntypedFormGroup;
    public idExpendiente: string = null;

    public ventanaPersonas: MatDialogRef<TablaPersonasComponent>;
    public ventanaInmueble: MatDialogRef<TablaInmueblesComponent>;
    public ventanaVehiculo: MatDialogRef<TablaVehiculosComponent>;
    public ventanaArmamento: MatDialogRef<TablaArmamentosComponent>;
    public ventanaOrganizacion: MatDialogRef<TablaOrganizacionesComponent>;

    constructor(
        private readonly _activeRoute: ActivatedRoute,
        private readonly _router: Router,
        private readonly _ref: ChangeDetectorRef,
        private readonly _matDialog: MatDialog,
        private readonly _formBuilder: UntypedFormBuilder,
        private readonly _expedienteService: ExpedientesService,
        public readonly defService: DefinicionesService,
        public readonly userService : UserService
    ) {
        this._activeRoute.queryParams.subscribe(({origen}) =>{
            this.idExpendiente = (origen) ? origen : null;
        })
    }

    ngOnInit(): void {
        this.crearFormulario();

        if(this.idExpendiente){
            this.llenarFormulario();
        }
        this.userService.user$.subscribe((user) => { this.usuario = user })
    }
    private crearFormulario(): void {
        this.formularioExpe = this._formBuilder.group({
            delito: [''],
            tribunal: [''],
            fiscalia: [''],
            observaciones: [''],
            fiscal: [''],
            juez:[''],
            nombre:[''],
            pieza:[''],
            imagenes:[[]],
            currentImageIndex: [0],
        });

    }
    private llenarFormulario(){
        this._expedienteService.retornarExpediente(this.idExpendiente).subscribe(expediente =>{
            console.log(expediente);
            this.expediente = expediente;
            this.archivosSubidos = expediente.imagenes ? expediente.imagenes : [];
            this.formularioExpe.patchValue({
                delito: expediente.delito,
                tribunal: expediente.tribunal,
                fiscalia: expediente.fiscalia,
                observaciones: expediente.observaciones,
                juez:expediente.juez,
                nombre: expediente.nombre,
                pieza:expediente.pieza,
                fiscal:expediente.fiscal,
                imagenes:(expediente.imagenes) ? expediente.imagenes: [],
            })
            if (expediente) {
                this.tablaPersonas = (expediente.id_personas);
                this.tablaPer = new MatTableDataSource(this.tablaPersonas);
                this._ref.detectChanges();
            }
            if (expediente) {
                this.tablaInmuebles = expediente.id_inmuebles;
                this.tablaIn = new MatTableDataSource(this.tablaInmuebles);
                this._ref.detectChanges();
            }
            if (expediente) {
                this.tablaVehiculos= expediente.id_vehiculos;
                this.tablaVe = new MatTableDataSource(this.tablaVehiculos);
                this._ref.detectChanges();
            }
            if (expediente) {
                this.tablaArmentos = expediente.id_armas;
                this.tablaAr = new MatTableDataSource(this.tablaArmentos);
                this._ref.detectChanges();
            }
            if (expediente) {
                this.tablaOrganizaciones = expediente.id_organizaciones;
                this.tablaOr = new MatTableDataSource(this.tablaOrganizaciones);
                this._ref.detectChanges();
            }
        })

    }
    public formularioExpediente() {
        this.verFormulario = true;
    }
    public recibirArchivo(archivos: string[]) {
        if(this.idExpendiente){
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

        this.formularioExpe.patchValue({
            imagenes: this.archivosSubidos
        })
    }

    agregarPersona() {
        this.ventanaPersonas = this._matDialog.open(TablaPersonasComponent, {
            data: {},
            disableClose: true,
            width: '100%',
        });
        this.ventanaPersonas.afterClosed().subscribe((persona: Persona) => {
            if (persona) {
                const existePersona = this.tablaPersonas.filter(p => p.id === persona.id)
                if(existePersona.length === 0){
                    this.tablaPersonas.push(persona);
                    this.tablaPer = new MatTableDataSource(this.tablaPersonas);
                    this._ref.detectChanges();
                }
            }
        });
    }
    agregarInmueble() {
        this.ventanaInmueble = this._matDialog.open(TablaInmueblesComponent, {
            data: {},
            disableClose: true,
            width: '100%',
        });
        this.ventanaInmueble.afterClosed().subscribe((inmueble: Inmueble) => {
            if (inmueble) {
                const existeInmueble = this.tablaInmuebles.filter(p => p.id === inmueble.id);
                if(existeInmueble.length === 0){
                    this.tablaInmuebles.push(inmueble);
                    this.tablaIn = new MatTableDataSource(this.tablaInmuebles);
                    this._ref.detectChanges();
                }
            }

        });
    }
    agregarVehiculo() {
        this.ventanaVehiculo = this._matDialog.open(TablaVehiculosComponent, {
            data: {},
            disableClose: true,
            width: '100%',
        });
        this.ventanaVehiculo.afterClosed().subscribe((vehiculo: Vehiculo) => {
            if (vehiculo) {
                const existeVehiculo = this.tablaVehiculos.filter(p => p.id === vehiculo.id);
                if(existeVehiculo.length === 0){
                    this.tablaVehiculos.push(vehiculo);
                    this.tablaVe = new MatTableDataSource(this.tablaVehiculos);
                    this._ref.detectChanges();
                }
            }

        });
    }
    agregarArmamento() {
        this.ventanaArmamento = this._matDialog.open(TablaArmamentosComponent, {
            data: {},
            disableClose: true,
            width: '100%',
        });
        this.ventanaArmamento.afterClosed().subscribe((armas: Armamento) => {
            if (armas) {
                const existeArma = this.tablaArmentos.filter(p => p.id === armas.id)
                if(existeArma.length === 0){
                    this.tablaArmentos.push(armas);
                    this.tablaAr = new MatTableDataSource(this.tablaArmentos);
                    this._ref.detectChanges();
                }

            }

        });
    }
    agregarOrganizacion(){
        this.ventanaOrganizacion = this._matDialog.open(TablaOrganizacionesComponent, {
            data: {},
            disableClose: true,
            width: '100%',
        });
        this.ventanaOrganizacion.afterClosed().subscribe((organizacion: Organizacion) => {
            if (organizacion) {
                const existeArma = this.tablaOrganizaciones.filter(p => p.id === organizacion.id)
                if(existeArma.length === 0){
                    this.tablaOrganizaciones.push(organizacion);
                    this.tablaOr = new MatTableDataSource(this.tablaOrganizaciones);
                    this._ref.detectChanges();
                }

            }

        });
    }

    borrarPersona(element: Persona){
        const personas = this.tablaPersonas.filter(p => p.id !== element.id)
        this.tablaPer = new MatTableDataSource(personas);
        this.tablaPersonas = personas;
    }
    borrarVehiculo(element: Vehiculo){
        const vehiculo = this.tablaVehiculos.filter(p => p.id !== element.id)
        this.tablaVe = new MatTableDataSource(vehiculo);
        this.tablaVehiculos = vehiculo;
    }
    borrarInmueble(element: Inmueble){
        const inmuebles = this.tablaInmuebles.filter(p => p.id !== element.id)
        this.tablaIn = new MatTableDataSource(inmuebles);
        this.tablaInmuebles = inmuebles;
    }
    borrarArmamento(element: Armamento){
        const armas = this.tablaArmentos.filter(p => p.id !== element.id)
        this.tablaAr = new MatTableDataSource(armas);
        this.tablaArmentos = armas;
    }
    borrarOrganizacion(element: Organizacion){
        const armas = this.tablaOrganizaciones.filter(p => p.id !== element.id)
        this.tablaOr = new MatTableDataSource(armas);
        this.tablaOrganizaciones = armas;
    }

    verPersona(persona: Persona){
        this.ventanaPersonas = this._matDialog.open(TablaPersonasComponent, {
            data: {
                persona: persona.id
            },
            disableClose: true,
            width: '100%',
        });
    }
    verVehiculo(vehiculo: Vehiculo){
        this.ventanaVehiculo = this._matDialog.open(TablaVehiculosComponent, {
            data: {
                vehiculo: vehiculo.id
            },
            disableClose: true,
            width: '100%',
        });
    }
    verInmuebles(inmueble: Inmueble){
        this.ventanaInmueble = this._matDialog.open(TablaInmueblesComponent, {
            data: {
                inmueble:inmueble.id
            },
            disableClose: true,
            width: '100%',
        });
    }
    verArmamento(arma: Armamento){
        this.ventanaArmamento = this._matDialog.open(TablaArmamentosComponent, {
            data: {
                armamento:arma.id
            },
            disableClose: true,
            width: '100%',
        });
    }
    verOrganizacion(organizacion: Organizacion ){
        this.ventanaOrganizacion = this._matDialog.open(TablaOrganizacionesComponent, {
            data: {
                organizacion:organizacion.id
            },
            disableClose: true,
            width: '100%',
        });
    }

    grabar() {
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
                const cadenaVehiculos = [];
                const cadenaInmuebles = [];
                const cadenaArmamentos = [];
                const cadenaPersonas = [];
                const cadenaBandas = [];

                this.tablaInmuebles.forEach((inmueble) => {
                    cadenaInmuebles.push(inmueble.id);
                });
                this.tablaArmentos.forEach((armamento) => {
                    cadenaArmamentos.push(armamento.id);
                });
                this.tablaVehiculos.forEach((vehiculo) => {
                    cadenaVehiculos.push(vehiculo.id);
                });
                this.tablaPersonas.forEach((persona) => {
                    cadenaPersonas.push(persona.id);
                });
                this.tablaOrganizaciones.forEach((banda) => {
                    cadenaBandas.push(banda.id);
                });
                //const expendite = ;
                const operacion = {

                        ...this.formularioExpe.value,
                        id_personas: (cadenaPersonas),
                        id_inmuebles: (cadenaInmuebles),
                        id_vehiculos: (cadenaVehiculos),
                        id_armas: (cadenaArmamentos),
                        id_organizaciones:cadenaBandas

                };
                console.log(operacion);
                this._expedienteService
                .crearExpediente(operacion)
                .subscribe((result) => {
                    console.log(result)
                });
            } else {
            }
        });
    }
    regresarBusqueda(){
        this._router.navigate(['/admin/busqueda']);
    }
    cycleImages(forward: boolean = true): void {
        const count = this.formularioExpe.get('imagenes').value.length;
        const currentIndex = this.formularioExpe.get('currentImageIndex').value;

        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        if (forward) {
            this.formularioExpe.get('currentImageIndex').setValue(nextIndex);
        }
        else {
            this.formularioExpe.get('currentImageIndex').setValue(prevIndex);
        }

        console.log(this.formularioExpe.get('currentImageIndex').value);
    }
}

/**
 *  id_personas: JSON.stringify(cadenaPersonas),
                        id_inmuebles: JSON.stringify(cadenaInmuebles),
                        id_vehiculos: JSON.stringify(cadenaVehiculos),
                        id_armas: JSON.stringify(cadenaArmamentos),
 */
