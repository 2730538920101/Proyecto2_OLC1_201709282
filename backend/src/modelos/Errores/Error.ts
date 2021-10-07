export enum TypeError{
    LEXICO,
    SINTACTICO,
    SEMANTICO
}

export class MiError{
    constructor(private line:number, private column:number, private type:TypeError, private message:string){

    }
}
