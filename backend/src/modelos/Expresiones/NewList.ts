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

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoNewList"+x.toString();
        const rama = `
        ${nombreNodoPrincipal}[label="DynamicList"];
        tipodato${nombreNodoPrincipal}[label="TIPO DE DATO"];
        tipodatoval${nombreNodoPrincipal}[label="${this.type.toString()}"];
        ${nombreNodoPrincipal} -> tipodato${nombreNodoPrincipal} -> tipodatoval${nombreNodoPrincipal};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}
