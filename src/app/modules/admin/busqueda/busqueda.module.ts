import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './busqueda.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';

const rutas: Route[] = [
    {
        path: '',
        component: BusquedaComponent,
    },
];

@NgModule({
  declarations: [
    BusquedaComponent
  ],
  imports: [
    CommonModule,SharedModule,FuseCardModule,RouterModule.forChild(rutas),
  ],
  exports: [RouterModule],
})
export class BusquedaModule { }
