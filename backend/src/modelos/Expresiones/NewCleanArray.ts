import { Expression } from "../Abstract/Expresiones"
import { Environment } from "../Symbol/Enviorment";
import { Retorno, Type } from "../Abstract/Retorno";
import { MiArray } from "../Symbol/Array";
import { Symbol } from "../Symbol/Symbol";
import { MiError, TypeError } from "../Errores/Error";

export class NewCleanArray extends Expression {

    constructor(private expr: Expression, private type:Type, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        let array = new MiArray();
        let value = this.expr.execute(environment);
        if(value.type == Type.INT){
            for(let i=0; i< value.value; i++){
                array.setValue(i, new Symbol(0, '', this.type));    
            }
            return { value: array, type: Type.ARRAY };
        }else{
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE HA PODIDO INSTANCIAR EL ARREGLO PORQUE LA EXPRESION ENTRE LAS LLAVES NO ES UN NUMERO");
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoNewCleanArray"+x.toString();
        const cant:{rama:string, nodo:string} = this.expr.draw();
        const rama = `
        ${nombreNodoPrincipal}[label="Array"];
        tipodato${nombreNodoPrincipal}[label="TIPO DE DATO"];
        tipodatoval${nombreNodoPrincipal}[label="${this.type.toString()}"];
        ${cant.rama}
        ${nombreNodoPrincipal} -> tipodato${nombreNodoPrincipal} -> tipodatoval${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> ${cant.nodo};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}
