import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { Route, RouterModule } from '@angular/router';
import { environment } from '@environments/environment';



const rutas: Route[] = [
    {
        path: '',
        component: AdminComponent,
        children:[
            {path: 'expediente', loadChildren: () => import('app/modules/admin/expedientes/expedientes.module').then(m => m.ExpedientesModule)},
            {path: 'busqueda', loadChildren: () => import('app/modules/admin/busqueda/busqueda.module').then(m => m.BusquedaModule)},
            {path: 'configuracion', loadChildren: () => import('app/modules/admin/configuracion/configuracion.module').then(m => m.ConfiguracionModule)}
        ]
    },
];

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],providers:[

  ]
})
export class AdminModule { }
