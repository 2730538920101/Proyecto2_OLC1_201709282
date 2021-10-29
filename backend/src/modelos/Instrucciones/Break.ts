import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from '../Abstract/Retorno';

export class Break extends Instruction{

    constructor(line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        return {line : this.line, column: this.column, type : Type.BREAK};
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoBreak"+x.toString();
        const rama = `
        ${nombreNodoPrincipal}[label="BREAK"];
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}