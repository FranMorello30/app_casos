/* eslint-disable @typescript-eslint/member-ordering */
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import html2pdf from 'html2pdf.js';
import { Vehiculo } from '../vehiculos/models/vehiculos.response';
import { Expediente } from '../../models/expediente.model';
@Component({
    selector: 'app-ficha-vehiculos',
    templateUrl: './ficha-vehiculos.component.html',
    styles: [],
})
export class FichaVehiculosComponent implements OnInit {
    //@ViewChild('dataToExport', { static: false }) data;
    @Output() cerrado: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() set vehiculo(vehiculo: Vehiculo) {
        this._vehiculo = vehiculo;
    }
    get vehiculo(): Vehiculo {
        return this._vehiculo;
    }

    @Input() set expediente(expediente: Expediente) {
        this._expediente = expediente;
    }
    get expediente(): Expediente {
        return this._expediente;
    }

    private _vehiculo: Vehiculo;
    private _expediente: Expediente;
    //public dataToExport: ElementRef;

    constructor() {}

    ngOnInit(): void {}
    public downloadAsPdf(): void {
        const element = document.getElementById('dataToExport');
        const opt = {
            margin: 0.5,
            filename: 'ficha_vehiculo.pdf',
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { scale: 2, letterRendering: true, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf().set(opt).from(element).save();
    }
    cerrarVista(): void {
        this.cerrado.emit(true);
    }
}
