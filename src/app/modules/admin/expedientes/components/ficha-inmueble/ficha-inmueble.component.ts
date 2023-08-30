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
import { Inmueble } from '../inmuebles/models/inmuebles.response';
import { Expediente } from '../../models/expediente.model';
@Component({
    selector: 'app-ficha-inmueble',
    templateUrl: './ficha-inmueble.component.html',
    styles: [],
})
export class FichaInmuebleComponent implements OnInit {
    //@ViewChild('dataToExport', { static: false }) data;
    @Output() cerrado: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() set inmueble(inmueble: Inmueble) {
        this._inmueble = inmueble;
    }
    get inmueble(): Inmueble {
        return this._inmueble;
    }

    @Input() set expediente(expediente: Expediente) {
        this._expediente = expediente;
    }
    get expediente(): Expediente {
        return this._expediente;
    }

    private _inmueble: Inmueble;
    private _expediente: Expediente;
    //public dataToExport: ElementRef;

    constructor() {}

    ngOnInit(): void {}
    public downloadAsPdf(): void {
        const element = document.getElementById('dataToExport');
        const opt = {
            margin: 0.5,
            filename: 'ficha_inmueble.pdf',
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
