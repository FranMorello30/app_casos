import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from './configuracion.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FormUsuarioComponent } from './components/usuarios/form-usuario/form-usuario.component';
import { SettingsTeamComponent } from './components/usuarios/team.component';
import { CierreComponent } from './components/cierre/cierre.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BitacoraComponent } from './components/bitacora/bitacora.component';

const rutas: Route[] = [
    {
        path: '',
        component: ConfiguracionComponent,
    },
];

@NgModule({
    declarations: [
        ConfiguracionComponent,
        SettingsTeamComponent,
        CierreComponent,
        FormUsuarioComponent,
        BitacoraComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatSidenavModule,
        MatSlideToggleModule,
        RouterModule.forChild(rutas),
        NgApexchartsModule
    ],
    exports: [RouterModule],
})
export class ConfiguracionModule {}
