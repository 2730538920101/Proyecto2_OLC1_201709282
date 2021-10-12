import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";

export class Break extends Instruction{

    constructor(line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        return {line : this.line, column: this.column, type : 'Break'};
    }
}