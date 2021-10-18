import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";



export class Case extends Instruction{
    constructor(private exp:Expression|null, private code:Instruction, line:number, column:number){
        super(line, column);
    }

    public execute(environment:Environment){
        return {exp:this.exp?.execute(environment), ins:this.code.execute(environment)};
    }
}