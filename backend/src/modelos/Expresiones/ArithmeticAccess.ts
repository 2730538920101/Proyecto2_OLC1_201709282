import { Environment } from "../Symbol/Enviorment";
import { MiError, TypeError } from '../Errores/Error';
import { Expression } from "../Abstract/Expresiones";
import { Retorno, Type } from "../Abstract/Retorno";

export enum ArithmeticAccessOption{
    MENOS_MENOS = 0,
    MAS_MAS = 1
}


export class ArithmeticAccess extends Expression{

    constructor(private id: string,private type:ArithmeticAccessOption, line : number, column: number){
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const value = environment.getVar(this.id);
        if(value == null){
            throw new MiError(this.line,this.column, TypeError.SEMANTICO, "LA VARIABLE NO EXISTE");
        }else{
            if(value.type == Type.INT){
                if(this.type == ArithmeticAccessOption.MAS_MAS){
                    let val = value.valor + 1;
                    return {value : val, type : value.type};
                }else{
                    let val = value.valor - 1;
                    return {value : val, type : value.type};
                }
                
            }{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "EL VALOR DE LA VARIABLE NO ES DE TIPO ENTERO");
            }
            
        }
    }
}