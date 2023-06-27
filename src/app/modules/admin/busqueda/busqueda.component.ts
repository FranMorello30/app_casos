import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BusquedaService } from './services/busqueda.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { DefinicionesService } from '@shared/services/definiciones.service';
import { UserService } from '@core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { Paginacion } from '@shared/services/paginacion.service';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styles: [
        `
            #header {
                /* background: url('/assets/images/fondos/azul.jpg') no-repeat 0
                    45%;
                background-size: cover; */
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
    providers: [{ provide: MatPaginatorIntl, useClass: Paginacion }],
})
export class BusquedaComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public columns: string[] = [
        'fecha',
        'nombre',
        'nro',
        'fiscalia',
        'tribunal',
    ];
    public tabla: MatTableDataSource<any>;
    public buscar: string;
    public usuario: Usuario;
    constructor(
        private readonly _router: Router,
        private readonly _busquedaService: BusquedaService,
        private readonly usuarioService: UserService,
        public readonly defService: DefinicionesService
    ) {}

    ngOnInit(): void {
        this.usuarioService.user$.subscribe(usuario =>{
            this.usuario = usuario
            //console.log(this.usuario)
        })
    }
    buscarExpedientes(): void {
        this._busquedaService
            .buscarExpedientes(this.buscar)
            .subscribe((expedientes) => {
                this.tabla = new MatTableDataSource(expedientes);
                this.tabla.paginator = this.paginator;
            });
    }
    crearExpediente(): void {
        this._router.navigate(['/admin/expediente']);
    }
    consultarExpendiente(idExpendiente: string): void {
        this._router.navigate(['/admin/expediente'], {
            queryParams: { origen: idExpendiente },
        });
    }
}
