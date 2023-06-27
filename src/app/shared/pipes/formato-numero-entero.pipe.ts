import { Pipe, PipeTransform } from '@angular/core';
//import {DecimalPipe}

@Pipe({
  name: 'entero'
})
export class FormatoNumeroEnteroPipe implements PipeTransform {

  transform(value: number): number {
    return  0;
  }

}
