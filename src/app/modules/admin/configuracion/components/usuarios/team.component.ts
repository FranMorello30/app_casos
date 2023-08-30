import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { ConfiguracionService } from '../../services/configuracion.service';
import { User } from '../../models/users';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'settings-team',
    templateUrl: './team.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTeamComponent implements OnInit {
    public members: User[];
    public roles = [
        {
            label: 'Operador',
            value: 'OPERADOR',
            description: 'Puede solo hacer consultas',
        },
        {
            label: 'Investigador',
            value: 'INVESTIGADOR',
            description: 'Puede consultar y crear expedientes',
        },
        {
            label: 'Supervisor',
            value: 'SUPERVISOR',
            description: 'Puede consultar y editar expedientes',
        },
        {
            label: 'Administrador',
            value: 'ADMINISTRADOR',
            description:
                'Puede consultar, crear, editar expedientes y crear otros usuarios',
        },
    ];
    public ventanaFormulario: MatDialogRef<FormUsuarioComponent>;

    constructor(
        private readonly _ref: ChangeDetectorRef,
        private readonly _matDialog: MatDialog,
        private readonly _configService: ConfiguracionService
    ) {}

    ngOnInit(): void {
        this.obtenerUsuarios();
    }
    borrarUsuario(user: User): void {
        this._configService.borrarUsuario(user.id).subscribe( resp =>{
            this.members = resp;
            this._ref.detectChanges();
        })
    }
    cambiarRolUsuario(rol: MatSelectChange,user: User): void {
        this._configService.cambiarRolUsuario(user.id, rol.value ).subscribe( resp =>{
            this.members = resp;
            this._ref.detectChanges();
        })
    }
    crearUsuario(): void {
        this.ventanaFormulario = this._matDialog.open(FormUsuarioComponent, {
            data: {},
            disableClose: true,
            width: '700px',
        });
        this.ventanaFormulario.afterClosed().subscribe((usuarios: User[]) => {
            if (usuarios) {
                this.members = usuarios;
                this._ref.detectChanges();
            }
        });
    }
    obtenerUsuarios(): void {
        this._configService.buscarUsuarios().subscribe( resp =>{
            this.members = resp;
            this._ref.detectChanges();
        })
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
