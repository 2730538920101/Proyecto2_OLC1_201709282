import { Expression } from "../Abstract/Expresiones"
import { Environment } from "../Symbol/Enviorment";
import { Retorno, Type } from "../Abstract/Retorno";
import { Array } from "../Symbol/Array";
import { Symbol } from "../Symbol/Symbol";
import { MiError, TypeError } from "../Errores/Error";

export class NewCleanArray extends Expression {

    constructor(private expr: Expression, private type:Type, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const array = new Array();
        let index = 0;
        const value = this.expr.execute(environment);
        if(value.type == Type.INT){
            for(let i=0; i< value.value; i++){
                array.setValue(index++, new Symbol(0, '', value.type));    
            }
            return { value: array, type: Type.ARRAY };
        }else{
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE HA PODIDO INSTANCIAR EL ARREGLO PORQUE LA EXPRESION ENTRE LAS LLAVES NO ES UN NUMERO");
        }
    }
}
