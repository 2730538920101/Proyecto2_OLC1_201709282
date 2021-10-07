import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Retorno, Type } from "../Abstract/Retorno";
import { Symbol } from '../Symbol/Symbol';
import { MiError, TypeError } from "../Errores/Error";

export class AccesArray extends Expression {

    constructor(private anterior: Expression, private index: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const anterior = this.anterior.execute(environment);
        if (anterior.type != Type.ARRAY){
            throw new MiError(this.line, this.column,TypeError.SEMANTICO, "NO ES UN ARREGLO");
        }else{
            const index = this.index.execute(environment);
            if (index.type != Type.INT){
                throw new MiError(this.line, this.column,TypeError.SEMANTICO, "EL INDICE NO ES UN NUMERO");
            }else{
                const value = anterior.value.getValue(index.value as number) as Symbol;
                return { type: value.type, value: value.valor }
            }
        }
    }
}