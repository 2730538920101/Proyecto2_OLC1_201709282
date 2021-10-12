import { Expression } from "../Abstract/Expresiones"
import { Environment } from "../Symbol/Enviorment";
import { Retorno, Type } from "../Abstract/Retorno";
import { Array } from "../Symbol/Array";
import { Symbol } from "../Symbol/Symbol";
import { MiError, TypeError } from "../Errores/Error";

export class NewArray extends Expression {

    constructor(private listExpr: [Expression], private type:Type, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const array = new Array();
        let index = 0;
        if(this.listExpr.every((actual)=> actual.execute(environment).type == this.type)){
            this.listExpr.forEach((expr) => {            
                const value = expr.execute(environment);
                array.setValue(index++, new Symbol(value.value, '', value.type));
            });
            return { value: array, type: Type.ARRAY };
        }else{
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LOS ELEMENTOS DEL ARRAY DEBEN SER DEL MISMO TIPO");
        }
    }
}

