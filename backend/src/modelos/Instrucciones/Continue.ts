import { Instruction } from "../Abstract/Instrucciones";
import { Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Enviorment";

export class Continue extends Instruction{

    constructor(line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        return {line : this.line, column: this.column, type : Type.CONTINUE};
    }
}