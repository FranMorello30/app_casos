import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoNombre'
})
export class FormatoNombrePipe implements PipeTransform {

  transform(nombre: string): string {
    if(nombre == null)
        return

    const cadena = nombre.toLowerCase()

    // let palabras = cadena.split(" ").map(palabra => {
    //     return palabra[0].toUpperCase() + palabra.slice(1);
    // })
    // return palabras.join(" ");

    const firstLetter = cadena.charAt(0);
    const rest = cadena.slice(1);
    return firstLetter.toUpperCase() + rest;

  }

}
