import { Component, OnInit } from '@angular/core';
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../services/configuracion.service';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form-usuario.component.html',
    styles: [],
})
export class FormUsuarioComponent implements OnInit {
    public tituloVentana = 'Usuarios';
    public formulario: UntypedFormGroup;
    public roles = [
        {
            label: 'Operador',
            value: 'OPERADOR',
        },
        {
            label: 'Investigador',
            value: 'INVESTIGADOR',
        },
        {
            label: 'Supervisor',
            value: 'SUPERVISOR',
        },
        {
            label: 'Administrador',
            value: 'ADMINISTRADOR',
        },
    ];
    constructor(
        public readonly matDialogRef: MatDialogRef<FormUsuarioComponent>,
        private readonly _formBuilder: UntypedFormBuilder,
        private readonly _configService: ConfiguracionService
    ) {}

    ngOnInit(): void {
        this.crearFormulario();
    }
    private crearFormulario(): void {
        this.formulario = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['',[Validators.required]],
            nombre: ['',[Validators.required]],
            apellido: ['', [Validators.required]],
            telefono: ['', [Validators.required]],
            correo: ['',[Validators.required]],
            cargo: ['',[Validators.required]],
            dependencia: ['',[Validators.required]],
            rol: ['',[Validators.required]],
            nro_id: ['',[Validators.required]],
        });
    }
    public grabar() {
        Swal.fire({
            title: 'Listo para grabar desea continuar?',
            icon: 'question',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                this._configService
                    .crearUsuario(this.formulario.value)
                    .subscribe((users) => {
                        this.matDialogRef.close(users);
                    });
            }
        });
    }
    public cerrarVentana() {
        this.matDialogRef.close();
    }
}
