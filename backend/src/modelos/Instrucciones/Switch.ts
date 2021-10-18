import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from '../Symbol/Enviorment';

export class Switch extends Instruction{
    constructor(private cambio:Expression, private casos:Array<Instruction>, line:number, column:number){
        super(line,column);
    }

    public execute(environment:Environment){
        for(let i = 0; i < this.casos.length; i++){
            let caso = this.casos[i].execute(environment)
            if(this.cambio.execute(environment) == caso){
                return caso;
            }else if(caso == null){
                return caso;
            }
        }
    }
}