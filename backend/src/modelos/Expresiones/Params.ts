import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";
import { Type } from "../Abstract/Retorno";

export class Params extends Instruction{
    constructor(private id:string, private type:Type, line:number, column:number){
        super(line, column);
    }
    public execute(environment: Environment) {

        environment.guardar(this.id, null, this.type);
    }

}

