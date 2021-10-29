import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";
import { Retorno, Type } from '../Abstract/Retorno';

export class Return extends Instruction{

    constructor(private expr : Expression, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment):Retorno{
        if(this.expr != null){
            const value = this.expr.execute(environment);
            return {value:value, type : Type.RETURN};
        }else{
            return {value:null, type : Type.RETURN};
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoReturn"+x.toString();
        const valor: {rama: string, nodo: string} = this.expr.draw();
        const rama = `
        ${nombreNodoPrincipal}[label="RETURN"];
        ${valor.rama}
        ${nombreNodoPrincipal} -> ${valor.nodo};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}