import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';

// import pdfMake from 'pdfmake/build/pdfmake';

// import pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import htmlToPdfmake from 'html-to-pdfmake';

import domToImage from 'dom-to-image';

import moment from 'moment';

@Component({
    selector: 'app-comprobantes',
    templateUrl: './comprobantes.component.html',
    styleUrls: ['./comprobantes.component.scss'],
})
export class ComprobantesComponent implements OnInit {
    @ViewChild('dataToExport', { static: false })
    public dataToExport: ElementRef;
    constructor() {}

    ngOnInit(): void {}
    public downloadAsPdf(): void {
        const width = this.dataToExport.nativeElement.clientWidth;
        const height = this.dataToExport.nativeElement.clientHeight + 40;
        let orientation = '';
        const imageUnit = 'pt';
        if (width > height) {
            orientation = 'l';
        } else {
            orientation = 'p';
        }
        domToImage
            .toPng(this.dataToExport.nativeElement, {
                width: width,
                height: height,
            })
            .then((result) => {
                const jsPdfOptions: any = {
                    orientation: orientation,
                    unit: imageUnit,
                    format: [width + 50, height + 220],
                };
                const pdf = new jsPDF(jsPdfOptions);
                pdf.setFontSize(35);
                pdf.setTextColor('#2585fe');
                pdf.text('Ficha Inmuebles', 25, 75);
                pdf.setFontSize(24);
                pdf.setTextColor('#131523');
                pdf.addImage(result, 'PNG', 25, 170, width, height);
                pdf.save('ficha_inmueble' + '.pdf');
            })
            .catch((error) => {});
    }
}
