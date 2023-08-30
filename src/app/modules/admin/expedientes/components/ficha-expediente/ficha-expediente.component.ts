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
import jsPDF from 'jspdf';
import domToImage from 'dom-to-image';
import html2pdf from 'html2pdf.js';
import { Expediente } from '../../models/expediente.model';
@Component({
    selector: 'app-ficha-expediente',
    templateUrl: './ficha-expediente.component.html',
    styles: [],
})
export class FichaExpedienteComponent implements OnInit {
    @Output() cerrado: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() set expediente(expediente: Expediente) {
        this._expediente = expediente;
    }
    get expediente(): Expediente {
        return this._expediente;
    }

    private _expediente: Expediente;
    //public dataToExport: ElementRef;

    constructor() {}

    ngOnInit(): void {}
    public downloadAsPdf(): void {
        const element = document.getElementById('dataToExport');
        const opt = {
            margin: 0.5,
            filename: 'ficha_expediente.pdf',
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
