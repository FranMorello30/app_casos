import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

import { DashboardsComponent } from './dashboards.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
const rutas: Route[] = [
    {
        path     : '',
        component: DashboardsComponent,
    }
];

@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(rutas),
    NgApexchartsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule
  ],exports:[
    RouterModule
  ]
})
export class DashboardsModule { }
