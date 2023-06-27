export class Definiciones {
    id:number
    siglas:string
    nombre:string
    descripcion:string
    valor:string | number | boolean
    tipo:string
    opciones:string
    status:boolean
    ctrolSugerido?:string
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(def)
    {
        {
            this.id = def.id || 0,
            this.siglas = def.sigla || '',
            this.nombre = def.nombre || '',
            this.descripcion = def.descripcion || '',
            this.valor = def.valor || '',
            this.tipo = def.tipo || ''
        }   
    }   

}
export type TipoEstado = 'CLIENTES' | 'DOCUMENTO' | 'PAMS' 