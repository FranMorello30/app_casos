import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DefinicionesService } from '@shared/services/definiciones.service';

@Component({
    selector: 'app-admin',
    template: ' <router-outlet></router-outlet> ',
})
export class AdminComponent implements OnInit {
    constructor(private readonly _router: Router,private readonly _defService: DefinicionesService) {}
    ngOnInit(): void {
        this._defService.inicializarApp();
        this._router.navigate(['/admin/busqueda']);
    }
}
