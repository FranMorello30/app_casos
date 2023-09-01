/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
    selector: 'app-bitacora',
    templateUrl: './bitacora.component.html',
    styles: [
        `
            .break-word {
                -ms-word-break: break-all;
                word-break: break-all;
                -webkit-word-break: break-all;
                -webkit-hyphens: auto;
                -moz-hyphens: auto;
                -ms-hyphens: auto;
                hyphens: auto;
            }
        `,
    ],
})
export class BitacoraComponent implements OnInit {
    @Input() set user(user: User) {
        this._user = user;
    }
    get user(): User {
        return this._user;
    }

    private _user: User;
    public activities: any[] = [];

    constructor(
        private readonly _ref: ChangeDetectorRef,
        private readonly _configService: ConfiguracionService
    ) {}

    ngOnInit(): void {
        this._configService
            .buscarHistorial(this.user.id)
            .subscribe((bitacoras) => {
                this.activities = bitacoras;
                this._ref.detectChanges();
            });
    }
}
