import { Expression } from "../Abstract/Expresiones"
import { Environment } from "../Symbol/Enviorment";
import { Retorno, Type } from "../Abstract/Retorno";
import { Array } from "../Symbol/Array";
import { Symbol } from "../Symbol/Symbol";

export class NewArray extends Expression {

    constructor(private listExpr: [Expression], line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const array = new Array();
        let index = 0;
        this.listExpr.forEach((expr) => {
            const value = expr.execute(environment);
            array.setValue(index++, new Symbol(value.value, '', value.type));
        });
        return { value: array, type: Type.ARRAY };
    }
}