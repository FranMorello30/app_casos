import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Pipe({
    name: 'formatoFecha',
})
export class FormatoFechaPipe implements PipeTransform {
    constructor(public datePipe: DatePipe) {
        //date:"dd-MM-yyyy"
    }

    transform(value: string): any {
        moment.locale();
      if(value === '0000-00-00'){
        return '00-00-0000';
      }else{
        //return  this.datePipe.transform(value,'dd-MM-yyyy');
        return moment(value).format('DD-MM-YYYY');
      }

    }
}
