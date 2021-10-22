import { Expression } from "../Abstract/Expresiones"
import { Environment } from "../Symbol/Enviorment";
import { Retorno, Type } from "../Abstract/Retorno";
import { MiArray } from "../Symbol/Array";
import { Symbol } from "../Symbol/Symbol";
import { MiError, TypeError } from "../Errores/Error";

export class NewArray extends Expression {

    constructor(private listExpr: [Expression], line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        let array = new MiArray();
        let index = 0;
        if(this.listExpr.every((actual)=> (actual.execute(environment).type == Type.INT)||(actual.execute(environment).type == Type.DOUBLE)||(actual.execute(environment).type == Type.CHAR)||(actual.execute(environment).type == Type.BOOLEAN)||(actual.execute(environment).type == Type.STRING))){
            this.listExpr.forEach((expr) => {            
                let value = expr.execute(environment);
                if(value.type == Type.CHAR){
                    array.setValue(index++, new Symbol(String.fromCharCode(value.value), '', value.type));
                }else{
                    array.setValue(index++, new Symbol(value.value, '', value.type));
                }
            });
            return { value: array, type: Type.ARRAY };
        }else{
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LOS ELEMENTOS DEL ARRAY DEBEN SER DEL MISMO TIPO");
        }
    }
}

