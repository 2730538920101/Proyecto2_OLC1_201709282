import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";

export class Return extends Instruction{

    constructor(private expr : Expression, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        if(this.expr != null){
            const value = this.expr.execute(environment);
            return {line : this.line, column: this.column, type : 'Return', value : value};
        }else{
            return {line : this.line, column: this.column, type : 'Return', value : null};
        }
    }
}