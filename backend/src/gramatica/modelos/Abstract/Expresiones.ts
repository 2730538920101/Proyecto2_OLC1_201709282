import { Retorno, Type } from "./Retorno";
import { Environment } from "../Symbol/Enviorment";
import { TablaSuma } from "../Util/TablaTipos";

export abstract class Expression {

    public line: number;
    public column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract execute(environment: Environment) : Retorno;

    public tipoDominante(tipo1 : Type, tipo2 : Type) : Type{
        const type = TablaSuma[tipo1][tipo2];
        return type;
    }

}