import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";
import { Retorno, Type } from '../Abstract/Retorno';

export class Return extends Instruction{

    constructor(private expr : Expression, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment):Retorno{
        if(this.expr != null){
            const value = this.expr.execute(environment);
            return {value:value, type : Type.RETURN};
        }else{
            return {value:null, type : Type.RETURN};
        }
    }
}