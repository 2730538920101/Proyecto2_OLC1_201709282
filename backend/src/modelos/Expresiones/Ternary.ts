import { Expression } from '../Abstract/Expresiones';
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Enviorment";
import { MiError, TypeError } from "../Errores/Error";


export class Ternary extends Expression{
    constructor(private condicion:Expression, private retorno:Expression, private retorno2:Expression, line:number, column:number){
        super(line, column);
    }

    public execute(environment:Environment):Retorno{
        const condition = this.condicion.execute(environment);
        if(condition.type == Type.BOOLEAN){
            if(condition.value == true){
                const return1 = this.retorno.execute(environment);
                return return1;
            }else if(condition.value == false){
                const return2 = this.retorno2.execute(environment);
                return return2;
            }else{
                throw new MiError(this.line,this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR LA OPERACION TERNARIA SI LA PRIMERA EXPRESION NO DEVUELVE UN BOOLEAN");
            }
        }else{
            return {value:null, type: Type.NULL};
        } 
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoTernary"+x.toString();
        const cond: {rama:string, nodo:string} = this.condicion.draw();
        const r1: {rama:string, nodo:string} = this.retorno.draw();
        const r2: {rama:string, nodo:string} = this.retorno2.draw();
        const rama = `
        ${nombreNodoPrincipal}[label="Ternary"];
        ${cond.rama}
        ${r1.rama}
        ${r2.rama}
        ${nombreNodoPrincipal} -> ${cond.nodo};
        ${nombreNodoPrincipal} -> ${r1.nodo};
        ${nombreNodoPrincipal} -> ${r2.nodo};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}

