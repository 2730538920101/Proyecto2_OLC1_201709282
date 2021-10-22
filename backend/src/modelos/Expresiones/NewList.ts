import { Expression } from "../Abstract/Expresiones"
import { Environment } from "../Symbol/Enviorment";
import { Retorno, Type } from "../Abstract/Retorno";
import { List } from "../Symbol/List";

export class NewList extends Expression {

    constructor(private type:Type, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const array = new List(this.type);
        return { value: array, type: Type.LIST };
    }
}
