import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, of, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from '@core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    private menu = {

        'OPERADOR' : {
            menu : [
                {
                    id: 'busqueda',
                    title: 'Busqueda',
                    tooltip : 'Busqueda ',
                    type    : 'basic',
                    icon: 'heroicons_outline:document-search',
                    link: '/admin/busqueda',
                },
            ]
        },
        'INVESTIGADOR' : {
            menu : [
                {
                    id: 'busqueda',
                    title: 'Busqueda',
                    tooltip : 'Busqueda ',
                    type    : 'basic',
                    icon: 'heroicons_outline:document-search',
                    link: '/admin/busqueda',
                },
                {
                    id: 'expediente',
                    title: 'Crear Expediente',
                    tooltip : 'Crear Expediente',
                    type    : 'basic',
                    icon: 'heroicons_outline:document-add',
                    link: '/admin/expediente',
                },
            ]
        },
        'SUPERVISOR' : {
            menu : [
                {
                    id: 'busqueda',
                    title: 'Busqueda',
                    tooltip : 'Busqueda ',
                    type    : 'basic',
                    icon: 'heroicons_outline:document-search',
                    link: '/admin/busqueda',
                },
                {
                    id: 'expediente',
                    title: 'Crear Expediente',
                    tooltip : 'Crear Expediente',
                    type    : 'basic',
                    icon: 'heroicons_outline:document-add',
                    link: '/admin/expediente',
                },
            ]
        },
        'ADMINISTRADOR' : {
            menu : [
                {
                    id: 'busqueda',
                    title: 'Busqueda',
                    tooltip : 'Busqueda ',
                    type    : 'basic',
                    icon: 'heroicons_outline:document-search',
                    link: '/admin/busqueda',
                },
                {
                    id: 'expediente',
                    title: 'Crear Expediente',
                    tooltip : 'Crear Expediente',
                    type    : 'basic',
                    icon: 'heroicons_outline:document-add',
                    link: '/admin/expediente',
                },
                {
                    id: 'configuracion',
                    title: 'Configuración',
                    tooltip : 'Configuración',
                    type    : 'basic',
                    icon: 'mat_solid:settings',
                    link: '/admin/configuracion',
                },
            ]
        }


    };
    private _user: Usuario;
    constructor(private _httpClient: HttpClient, public readonly userService : UserService)
    {
        this.userService.user$.subscribe( user =>{
           this._user = user;
        })
    }

    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    get(): Observable<Navigation>
    {

            const menu = this.menu[this._user.rol];
            console.log(menu);

            const menuApp = this.moldearMenu(menu.menu);
        console.log(menuApp)
        this._navigation.next(menuApp);
           return of(menuApp);




        // return this._httpClient.get<Navigation>('api/common/navigation').pipe(
        //     tap((navigation) => {
        //         this._navigation.next(navigation);
        //     })
        // );
        // return this._httpClient.get<any>(`${this.baseUrl}/menu`).pipe(
        //     tap((res) =>{
        //         const menu=  this.moldearMenu(res.menuApp);
        //         this._navigation.next(menu);
        //     })
        // )
    }
    moldearMenu(menu: any[]): Navigation{
        return {
            compact: menu,
            default: menu,
            futuristic: menu,
            horizontal: menu,
        }
    }
}
