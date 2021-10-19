import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Retorno, Type } from "../Abstract/Retorno";
import { Symbol } from '../Symbol/Symbol';
import { MiError, TypeError } from "../Errores/Error";

export class AccesArray extends Expression {

    constructor(private anterior: string, private index: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        let anterior = environment.getVar(this.anterior);
        if(anterior != null || anterior != undefined){
            if (anterior.type != Type.ARRAY){
                throw new MiError(this.line, this.column,TypeError.SEMANTICO, "NO ES UN ARREGLO");
            }else{
                let index = this.index.execute(environment);
                if(index != null || index != undefined){
                    if (index.type != Type.INT){
                        throw new MiError(this.line, this.column,TypeError.SEMANTICO, "EL INDICE NO ES UN NUMERO");
                    }else{
                        let valoractual = anterior.valor.getValue(index.value);
                        return {value: valoractual.valor, type: valoractual.type};
                    }
                }else{
                    throw new MiError(this.line, this.column,TypeError.SEMANTICO, "NO HA ENVIADO EL INDICE CORRECTAMENTE");
                }
            }
        }else{
            throw new MiError(this.line, this.column,TypeError.SEMANTICO, "NO SE HA DECLARADO EL ARREGLO");
        }
        
    }
}