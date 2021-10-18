import { Environment } from "../Symbol/Enviorment";
import { Type, Retorno } from '../Abstract/Retorno';
import { Expression } from '../Abstract/Expresiones';

export class Params extends Expression{
    constructor(private id:string, private type:Type, line:number, column:number){
        super(line, column);
    }
    public execute(environment: Environment):Retorno{
        environment.guardar(this.id,"", this.type);
        return {value:this.id, type:this.type};
    }

}

