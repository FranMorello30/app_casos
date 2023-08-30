/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { Expediente } from '../../models/expediente.model';
import { Armamento } from '../armamentos/models/armamentos.response';

@Component({
    selector: 'app-ficha-armamento',
    templateUrl: './ficha-armamento.component.html',
    styles: [],
})
export class FichaArmamentoComponent implements OnInit {
    @Output() cerrado: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() set armamento(armamento: Armamento) {
        this._armamento = armamento;
    }
    get armamento(): Armamento {
        return this._armamento;
    }

    @Input() set expediente(expediente: Expediente) {
        this._expediente = expediente;
    }
    get expediente(): Expediente {
        return this._expediente;
    }

    private _armamento: Armamento;
    private _expediente: Expediente;
    //public dataToExport: ElementRef;

    constructor() {}

    ngOnInit(): void {}
    public downloadAsPdf(): void {
        const element = document.getElementById('dataToExport');
        const opt = {
            margin: 0.5,
            filename: 'ficha_armamento.pdf',
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
