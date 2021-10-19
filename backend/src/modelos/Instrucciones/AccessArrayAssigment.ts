import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from "../Abstract/Retorno";
import { Symbol } from '../Symbol/Symbol';
import { MiError, TypeError } from "../Errores/Error";
import { Instruction } from '../Abstract/Instrucciones';

export class AccessArrayAssigment extends Instruction {

    constructor(private anterior: Array<string>, private index: Expression, private value:Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment){
        for(let i =0; i<this.anterior.length; i++){
            let anterior = environment.getVar(this.anterior[i]);
            if(anterior){
                if (anterior.type != Type.ARRAY){
                    throw new MiError(this.line, this.column,TypeError.SEMANTICO, "NO ES UN ARREGLO");
                }else{
                    let index = this.index.execute(environment);
                    if (index.type != Type.INT){
                        throw new MiError(this.line, this.column,TypeError.SEMANTICO, "EL INDICE NO ES UN NUMERO");
                    }else{
                        let valor = this.value.execute(environment);
                        if(valor.type == Type.CHAR){
                            let sim = new Symbol(String.fromCharCode(valor.value), anterior.id, valor.type);
                            anterior.valor.setValue(index.value, sim);
                        }else{
                            let sim = new Symbol(valor.value, anterior.id, valor.type);
                            anterior.valor.setValue(index.value, sim);
                        }    
                    }
                }
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
            }
        }
        
    }
}