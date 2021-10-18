import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from '../Symbol/Enviorment';

export class For extends Instruction{
    constructor(private asignacion:Instruction, private condicion:Expression, private incremento:Expression, private statement:Instruction, line:number, column:number ){
        super(line,column);
    }

    public execute(){
        
    }
}