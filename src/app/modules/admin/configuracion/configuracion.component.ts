import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Usuario } from '@shared/models/usuario.model';
import { Subject, takeUntil } from 'rxjs';
import { User } from './models/users';

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguracionComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;

    @ViewChild('matDrawer', { static: true }) matDrawerUser: MatDrawer;

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'usuarios';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

    ngOnInit(): void {
        this.panels = [
            {
                id: 'cierre',
                icon: 'heroicons_outline:lock-closed',
                title: 'Cierre',
                description: 'Realiza el cierre y cambio de año del sistema',
            },
            {
                id: 'usuarios',
                icon: 'heroicons_outline:user-group',
                title: 'Usuarios',
                description:
                    'Maneja los usuarios y puedes cambiar los roles y permisos',
            },
        ];

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    goToPanel(panel: string): void {
        this.selectedPanel = panel;

        if (this.drawerMode === 'over') {
            this.drawer.close();
        }
    }

    getPanelInfo(id: string): any {
        return this.panels.find((panel) => panel.id === id);
    }

    // historialUsuario(user: User): void {
    //     this.matDrawerUser.open();
    // }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
