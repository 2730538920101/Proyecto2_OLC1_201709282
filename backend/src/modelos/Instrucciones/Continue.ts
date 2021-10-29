import { Instruction } from "../Abstract/Instrucciones";
import { Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Enviorment";

export class Continue extends Instruction{

    constructor(line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        return {line : this.line, column: this.column, type : Type.CONTINUE};
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoContinue"+x.toString();
        const rama = `
        ${nombreNodoPrincipal}[label="CONTINUE"];
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}