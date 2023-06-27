import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from './models/vehiculos.response';
import { VehiculosService } from './services/vehiculos.service';
import { Paginacion } from '@shared/services/paginacion.service';
import Swal from 'sweetalert2';
import { Imagen } from '@shared/models/imagen.model';
import { ExcelService } from '@shared/services/excel.service';
import { UserService } from '@core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { DefinicionesService } from '@shared/services/definiciones.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-tabla-vehiculos',
    templateUrl: './tabla-vehiculos.component.html',
    providers: [{ provide: MatPaginatorIntl, useClass: Paginacion }],
    styles: [
        `
            table {
                width: 100%;
            }
        `,
    ],
})
export class TablaVehiculosComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    public tabIndice = 0;
    public tabActual = "Formulario";
    public tituloVentana = 'Vehiculos';
    public tabla: MatTableDataSource<Vehiculo>;
    public buscar: string;
    public columns: string[] = ['placa', 'tipo', 'marca', 'modelo', 'anio', 'acciones'];
    public formulario: UntypedFormGroup;
    verFormulario = true;
    archivosSubidos: string[] = [];
    public listoTipo = ['Motocicleta', 'Automovil','Camion' ,'Camioneta', 'Yate', 'Avión','Helicóptero','Otro' ];
    public marcas = [
        "Acura",
        "Alfa Romeo",
        "Aston Martin",
        "Audi",
        "Bentley",
        "BMW",
        "Bugatti",
        "Cadillac",
        "Chevrolet",
        "Chrysler",
        "Dodge",
        "Ferrari",
        "Fiat",
        "Ford",
        "Genesis",
        "Honda",
        "Hyundai",
        "Infiniti",
        "Jaguar",
        "Jeep",
        "Kia",
        "Lamborghini",
        "Land Rover",
        "Lexus",
        "Lincoln",
        "Maserati",
        "McLaren",
        "Mercedes-Benz",
        "Mini",
        "Mitsubishi",
        "Nissan",
        "Opel",
        "Peugeot",
        "Porsche",
        "Renault",
        "Rolls-Royce",
        "Saab",
        "SEAT",
        "Subaru",
        "Suzuki",
        "Tesla",
        "Toyota",
        "Volkswagen",
        "Volvo",
        "Otros"
      ];
// marcaMoto = [
//     "Aprilia",
//     "Benelli",
//     "BMW Motorrad",
//     "Brixton",
//     "Ducati",
//     "Harley-Davidson",
//     "Honda",
//     "Indian",
//     "Kawasaki",
//     "KTM",
//     "Léon Moto",
//     "Mash",
//     "Moto Guzzi",
//     "MV Agusta",
//     "Royal Enfield",
//     "Sachs",
//     "Suzuki",
//     "Triumph",
//     "Vespa",
//     "Victory",
//     "Yamaha",
//   ];
//   marcaYates = [
//     "Azimut",
//     "Benetti",
//     "Boesch",
//     "Brunswick",
//     "Cabo Yachts",
//     "Christensen",
//     "CRN",
//     "Dehler",
//     "Dufour",
//     "Ferretti",
//     "Fjord",
//     "Four Winns",
//     "Grand Soleil",
//     "Hampton Yachts",
//     "Heesen",
//     "Island Packet",
//     "Jeanneau",
//     "Lago",
//     "Lürssen",
//     "McLaren",
//     "Monte Carlo Yachts",
//     "Nautitech",
//     "Nordhavn",
//     "Perini Navi",
//     "Princess",
//     "Riva",
//     "Sunseeker",
//     "Thomson",
//     "Windy",
//   ];
//   marcasAviones = [
//     "Airbus",
//     "Boeing",
//     "Bombardier",
//     "Embraer",
//     "Gulfstream",
//     "Honda Aircraft",
//     "Lockheed Martin",
//     "Mitsubishi Aircraft",
//     "Pilatus",
//     "Textron Aviation",
//     "Thales",
//     "Sikorsky",
//     "Wartsila",
//   ]
    listaEstado = ['Asegurado', 'No Asegurado'];
    private dataExport = [];
    public usuario: Usuario;
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private _data: { vehiculo: string, origen: string },
        public matDialogRef: MatDialogRef<TablaVehiculosComponent>,
        private readonly _formBuilder: UntypedFormBuilder,
        private readonly _excelService: ExcelService,
        private readonly _vehiculosService: VehiculosService,
        private readonly usuarioService: UserService,
        public readonly defService: DefinicionesService
    ) {}

    ngOnInit(): void {
        this.retornarVehiculos();
        this.crearFormulario();
        if(this._data.vehiculo){
            this.editarFormulario();
        }
        this.usuarioService.user$.subscribe(usuario =>{
            this.usuario = usuario;
        })
    }
    private crearFormulario(): void {
        this.formulario = this._formBuilder.group({
            tipo: ['', [Validators.required]],
            placa: ['', [Validators.required]],
            serial_carroceria: ['', [Validators.required]],
            serial_motor: ['', [Validators.required]],
            color: ['', [Validators.required]],
            modelo: ['', [Validators.required]],
            marca: ['', [Validators.required]],
            anio: [0, [Validators.required]],
            observaciones: [''],
            estado:[''],
            custodia:[''],
            localizacion:[],
            imagenes: [[]],
            currentImageIndex: [0],
            fecha_compra: ['', [Validators.required]],
        });
    }
    private editarFormulario(){
        this._vehiculosService.retornarVehiculo(this._data.vehiculo).subscribe( vehiculo =>{
            console.log(vehiculo)
            this.formulario.patchValue({
                tipo:vehiculo.tipo,
                placa:vehiculo.placa,
                serial_carroceria:vehiculo.serial_carroceria,
                serial_motor:vehiculo.serial_motor,
                color:vehiculo.color,
                modelo:vehiculo.modelo,
                marca:vehiculo.marca,
                anio:vehiculo.anio,
                fecha_compra:vehiculo.fecha_compra,
                observaciones:vehiculo.observaciones,
                estado:vehiculo.estado,
                custodia:vehiculo.custodia,
                localizacion:vehiculo.localizacion,
                imagenes:(vehiculo.imagenes) ? vehiculo.imagenes : []
            })
            this.archivosSubidos = vehiculo.imagenes ? vehiculo.imagenes : [];
        })
    }
    private retornarVehiculos() {
        this._vehiculosService.retornarVehiculos().subscribe((vehiculos) => {
            this.tabla = new MatTableDataSource(vehiculos);
            this.tabla.paginator = this.paginator;
            this.tabla.sort = this.sort;
            vehiculos.forEach((element) => {
                const {
                    placa,
                    tipo,
                    marca,
                    modelo,
                    anio,
                } = element;
                this.dataExport.push({
                    placa,
                    tipo,
                    marca,
                    modelo,
                    'año':anio,
                });
            });
        });
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
                console.log(this.formulario.value);

                if(this._data.vehiculo){
                    this._vehiculosService
                    .actualizarVehiculo(this._data.vehiculo,this.formulario.value)
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
                    this._vehiculosService
                    .crearVehiculo(this.formulario.value)
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
        if(this._data.vehiculo){
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
    public seleccionar(vehiculo: Vehiculo) {
        this.matDialogRef.close(vehiculo);
    }
    public exportExcel(){
        this._excelService.exportExcel(this.dataExport, 'vehiculos');
    }
    public exportPdf(){
        this._excelService.exportPdf(
            this.dataExport,
            [
                'placa',
                    'tipo',
                    'marca',
                    'modelo',
                    'año',
            ],
            'vehiculos'
        );
    }
    verRegistro(persona: Vehiculo){
        this._data.vehiculo = persona.id;
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
