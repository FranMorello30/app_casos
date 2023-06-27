/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, inject, Inject, OnDestroy } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
}
