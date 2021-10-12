import { Expression } from "../Abstract/Expresiones";
import { Environment } from '../Symbol/Enviorment';
import { Instruction } from "../Abstract/Instrucciones";
import { Access } from "../Expresiones/Access";
import { Type } from '../Abstract/Retorno';
import { MiError, TypeError } from '../Errores/Error';



export class Assigment extends Instruction{
    constructor(private id:Access[], private value:Expression, line:number, column:number){
        super(line, column);
    }

    public execute(environment:Environment){
        const val = this.value.execute(environment);
        for(let i = 0; i < this.id.length; i++){
            let valorid = this.id[i].execute(environment).value;
            if(valorid){
                environment.guardar(valorid, val.value, val.type);
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
            }
            
        }
    }

    public getType(environment:Environment):Type{
        return this.value.execute(environment).type;
    }
}