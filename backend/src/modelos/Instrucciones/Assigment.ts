import { Expression } from "../Abstract/Expresiones";
import { Environment } from '../Symbol/Enviorment';
import { Instruction } from "../Abstract/Instrucciones";
import { Type } from '../Abstract/Retorno';
import { MiError, TypeError } from '../Errores/Error';



export class Assigment extends Instruction{
    constructor(private id:Array<string>, private value:Expression, line:number, column:number){
        super(line, column);
    }

    public execute(environment:Environment){
        let val = this.value.execute(environment);
        if(val != null || val != undefined){
            for(let i = 0; i < this.id.length; i++){
                let iden = environment.getVar(this.id[i]);
                if(iden != null || iden != undefined){
                    environment.guardar(this.id[0], val.value, val.type);
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
                }              
            }
        }else{
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE ASIGNAR EL VALOR");
        }
    }

    public getType(environment:Environment):Type{
        if(this.value.execute(environment).type == Type.ARRAY){
            return this.value.execute(environment).value.getValue(0).type;

        }else if(this.value.execute(environment).type == Type.LIST){
            return this.value.execute(environment).value.type;
        }else{
            return this.value.execute(environment).type;
        }
    }

    public getId():string{
        return this.id[0];
    }

}