import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from './configuracion.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SettingsTeamComponent } from './team/team.component';
import { FormUsuarioComponent } from './team/form-usuario/form-usuario.component';

const rutas: Route[] = [
    {
        path: '',
        component: ConfiguracionComponent,
    },
];

@NgModule({
    declarations: [ConfiguracionComponent, SettingsTeamComponent, FormUsuarioComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatSidenavModule,
        MatSlideToggleModule,
        RouterModule.forChild(rutas),
    ],
    exports: [RouterModule],
})
export class ConfiguracionModule {}
