import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from "../Abstract/Retorno";
import { Symbol } from '../Symbol/Symbol';
import { MiError, TypeError } from "../Errores/Error";
import { Instruction } from '../Abstract/Instrucciones';

export class AccessArrayAssigment extends Instruction {

    constructor(private anterior: Expression[], private index: Expression, private value:Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment){
        for(let i =0; i<this.anterior.length; i++){
            const anterior = this.anterior[i].execute(environment);
            if(anterior){
                if (anterior.type != Type.ARRAY){
                    throw new MiError(this.line, this.column,TypeError.SEMANTICO, "NO ES UN ARREGLO");
                }else{
                    const index = this.index.execute(environment);
                    if (index.type != Type.INT){
                        throw new MiError(this.line, this.column,TypeError.SEMANTICO, "EL INDICE NO ES UN NUMERO");
                    }else{
                        const valor = this.value.execute(environment);
                        if(valor.type == anterior.type){
                            anterior.value.setValue(index.value as number, valor.value) as Symbol;
                        }else{
                            throw new MiError(this.line, this.column,TypeError.SEMANTICO, "EL VALOR QUE DESEA ALMACENAR NO ES DEL TIPO DEL QUE LA VARIABLE FUE DECLARADA");
                        }
                    }
                }
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
            }
        }
    }
}