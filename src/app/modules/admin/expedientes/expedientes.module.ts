import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from '@shared/shared.module';
import { UploadArchivoModule } from '@shared/components/upload-archivo/upload-archivo.module';

import { ExpedientesComponent } from './expedientes.component';
import { TablaArmamentosComponent } from './components/armamentos/tabla-armamentos.component';
import { TablaInmueblesComponent } from './components/inmuebles/tabla-inmuebles.component';
import { TablaOrganizacionesComponent } from './components/organizaciones/tabla-organizaciones.component';
import { TablaPersonasComponent } from './components/personas/tabla-personas.component';
import { TablaVehiculosComponent } from './components/vehiculos/tabla-vehiculos.component';


const rutas: Route[] = [
    {
        path: '',
        component: ExpedientesComponent,
    },
];

@NgModule({
    declarations: [
        ExpedientesComponent,
        TablaPersonasComponent,
        TablaVehiculosComponent,
        TablaInmueblesComponent,
        TablaArmamentosComponent,
        TablaOrganizacionesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FuseCardModule,
        UploadArchivoModule,
        RouterModule.forChild(rutas),
    ],
    exports: [RouterModule],
})
export class ExpedientesModule {}
