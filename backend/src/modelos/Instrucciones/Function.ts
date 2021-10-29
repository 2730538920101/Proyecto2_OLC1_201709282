import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from "../Abstract/Retorno";


export class Function extends Instruction{

    constructor(private id: string, public type: Type, public statment: Instruction, public parametros : Array<Expression>, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        environment.guardarFuncion(this.id, this);
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoFunction"+x.toString();
        let param = ``;
        const inst: {rama: string, nodo: string} = this.statment.draw();
        for(let i = 0; i<this.parametros.length; i++){
            let par: {rama: string, nodo: string} = this.parametros[i].draw();
            param = param + `
            nodoparam${nombreNodoPrincipal}${i}[label="PARAMETRO"];
            ${par.rama}
            ${nombreNodoPrincipal} -> nodoparam${nombreNodoPrincipal}${i} -> ${par.nodo};
            `;
        }
        const rama = `
        ${nombreNodoPrincipal}[label="FUNCTION"];
        nodoid${nombreNodoPrincipal}[label="ID"];
        nodoidval${nombreNodoPrincipal}[label="${this.id}"];
        ${param}
        ${inst.rama}
        nodotipo${nombreNodoPrincipal}[label="TIPO DE DATO"];
        nodotipoval${nombreNodoPrincipal}[label="${this.type.toString()}"];
        ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> nodotipo${nombreNodoPrincipal} -> nodotipoval${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> ${inst.nodo};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}
