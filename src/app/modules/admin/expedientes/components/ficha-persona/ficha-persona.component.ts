/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { Expediente } from '../../models/expediente.model';
import { Persona } from '../personas/models/persona.response';
@Component({
    selector: 'app-ficha-persona',
    templateUrl: './ficha-persona.component.html',
    styles: [],
})
export class FichaPersonaComponent implements OnInit {
    @Output() cerrado: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() set persona(persona: Persona) {
        this._persona = persona;
    }
    get persona(): Persona {
        return this._persona;
    }

    @Input() set expediente(expediente: Expediente) {
        this._expediente = expediente;
    }
    get expediente(): Expediente {
        return this._expediente;
    }

    private _persona: Persona;
    private _expediente: Expediente;
    //public dataToExport: ElementRef;

    constructor() {}

    ngOnInit(): void {}
    public downloadAsPdf(): void {
        const element = document.getElementById('dataToExport');
        const opt = {
            margin: 0.5,
            filename: 'ficha_persona.pdf',
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
