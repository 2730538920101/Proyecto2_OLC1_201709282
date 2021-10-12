import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";
import { Type, Retorno } from '../Abstract/Retorno';

export class Params extends Expression{
    constructor(private id:string, private type:Type, line:number, column:number){
        super(line, column);
    }
    public execute(environment: Environment):Retorno{
        environment.guardar(this.id, null, this.type);
        return {value:this.id, type:this.type};
    }

}

