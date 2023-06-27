import { Pipe, PipeTransform } from '@angular/core';
import { DefinicionesService } from '@shared/services/definiciones.service';

@Pipe({
    name: 'fechaHora',
})
export class FormatoFechaHoraPipe implements PipeTransform {
    constructor(public defService: DefinicionesService) {
        //date:"dd-MM-yyyy"
    }

    transform(value: string): string {

        //Enero 25, 2023 7:23 AM
        const formato = value.split('T');

        const date = formato[0].split('-');
        const time = formato[1].split(':');
        console.log(time)
        const horaDB = time[0];
        const minutosDB = time[1];
        let hora = '';
        if(+horaDB > 12){
            hora = `${+horaDB - 12}:${minutosDB} PM`;
        }else{
            hora = `${horaDB}:${minutosDB} AM`;
        }
        return this.defService.retornarMesFormateado(+date[2], +date[1], +date[0])  + ' ' + hora;

    }
}
