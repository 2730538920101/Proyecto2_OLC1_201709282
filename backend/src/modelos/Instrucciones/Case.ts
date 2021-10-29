import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from '../Abstract/Expresiones';
import { Environment } from "../Symbol/Enviorment";




export class Case extends Instruction{
    constructor(private exp:Expression|null, private code:Instruction, line:number, column:number){
        super(line, column);
    }

    public execute(environment:Environment){
        const element = this.code.execute(environment);
                if(element != null || element != undefined){
                    return element;
                }
    }

    public getExp():Expression|null{
        return this.exp;
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoCase"+x.toString();
        const inst: {rama: string, nodo: string} = this.code.draw();
        if(this.exp != null){
            const expExp: {rama: string, nodo: string} = this.exp.draw(); 
            const rama = `
            ${nombreNodoPrincipal}[label="CASE"];
            ${expExp.rama}
            ${inst.rama}
            ${nombreNodoPrincipal} -> ${expExp.nodo};
            ${nombreNodoPrincipal} -> ${inst.nodo};
            `;
            return {rama: rama, nodo: nombreNodoPrincipal.toString()};
        }else{
            const rama = `
            ${nombreNodoPrincipal}[label="DEFAULT"];
            ${inst.rama}
            ${nombreNodoPrincipal} -> ${inst.nodo}
            `;
            return {rama: rama, nodo: nombreNodoPrincipal.toString()};
        }
    }
}

