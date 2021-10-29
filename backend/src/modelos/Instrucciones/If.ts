import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from "../Abstract/Retorno";
import { MiError, TypeError } from '../Errores/Error';

export class If extends Instruction{

    constructor(private condition : Expression, private code : Instruction, private statement : Instruction | null | undefined,
        line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
        const condition = this.condition.execute(env);
        if(condition.type != Type.BOOLEAN){
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA CONDICION NO RETORNA UN VALOR BOOLEANO");
        }else{
            if(condition.value === true){
                return this.code.execute(env);
            }else if(condition.value === false){
                return this.statement?.execute(env);
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA CONDICION NO SE HA PODIDO EVALUAR");
            }
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoIf"+x.toString();
        const cond: {rama: string, nodo: string} = this.condition.draw();
        const inst: {rama: string, nodo: string} = this.code.draw();
        if(this.statement != null){
            const elsest: {rama: string, nodo: string} = this.statement.draw();
            const ramaelse = `
            ${nombreNodoPrincipal}[label="IF / ELSE IF"];
            ${cond.rama}
            ${inst.rama}
            nodoelse${nombreNodoPrincipal}[label="ELSE"];
            ${elsest.rama}
            ${nombreNodoPrincipal} -> ${cond.nodo};
            ${nombreNodoPrincipal} -> ${inst.nodo};
            ${nombreNodoPrincipal} -> nodoelse${nombreNodoPrincipal} -> ${elsest.nodo};
            `;
            return {rama: ramaelse, nodo: nombreNodoPrincipal.toString()};
        }else{
            const ramaif = `
            ${nombreNodoPrincipal}[label="IF / ELSE IF"];
            ${cond.rama}
            ${inst.rama}
            ${nombreNodoPrincipal} -> ${cond.nodo};
            ${nombreNodoPrincipal} -> ${inst.nodo};
            `;
            return {rama: ramaif, nodo: nombreNodoPrincipal.toString()};
        }
    }
}