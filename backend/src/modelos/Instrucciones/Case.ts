import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from '../Abstract/Expresiones';
import { Environment } from "../Symbol/Enviorment";
import { Type } from "../Abstract/Retorno";



export class Case extends Instruction{
    constructor(private exp:Expression|null, private code:Instruction, line:number, column:number){
        super(line, column);
    }

    public execute(environment:Environment){
        const element = this.code.execute(environment);
                if(element != null || element != undefined){
                    return element;
                }
    }

    public getExp():Expression|null{
        return this.exp;
    }
}

