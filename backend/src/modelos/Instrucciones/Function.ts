import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Params } from "../Expresiones/Params";

export class Function extends Instruction{

    constructor(private id: string, public type: TypeFunction, public statment: Instruction, public parametros : Array<Params>, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        environment.guardarFuncion(this.id, this);
    }
}

export enum TypeFunction{
    INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4,
    NULL = 5,
    ARRAY = 6,
    LIST = 7
}