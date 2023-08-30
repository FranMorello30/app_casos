import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from '@shared/shared.module';
import { UploadArchivoModule } from '@shared/components/upload-archivo/upload-archivo.module';

import { ExpedientesComponent } from './expedientes.component';
import { TablaArmamentosComponent } from './components/armamentos/tabla-armamentos.component';
import { TablaInmueblesComponent } from './components/inmuebles/tabla-inmuebles.component';
import { TablaOrganizacionesComponent } from './components/organizaciones/tabla-organizaciones.component';
import { TablaPersonasComponent } from './components/personas/tabla-personas.component';
import { TablaVehiculosComponent } from './components/vehiculos/tabla-vehiculos.component';
import { ComprobantesComponent } from './components/comprobantes/comprobantes.component';
import { FichaExpedienteComponent } from './components/ficha-expediente/ficha-expediente.component';
import { FichaInmuebleComponent } from './components/ficha-inmueble/ficha-inmueble.component';
import { FichaVehiculosComponent } from './components/ficha-vehiculos/ficha-vehiculos.component';
import { FichaPersonaComponent } from './components/ficha-persona/ficha-persona.component';
import { FichaArmamentoComponent } from './components/ficha-armamento/ficha-armamento.component';
import { FichaOrganizacionComponent } from './components/ficha-organizacion/ficha-organizacion.component';

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
        TablaOrganizacionesComponent,
        ComprobantesComponent,
        FichaExpedienteComponent,
        FichaInmuebleComponent,
        FichaVehiculosComponent,
        FichaPersonaComponent,
        FichaArmamentoComponent,
        FichaOrganizacionComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatSidenavModule,
        FuseCardModule,
        UploadArchivoModule,
        RouterModule.forChild(rutas),
    ],
    exports: [RouterModule],
})
export class ExpedientesModule {}
