import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from '../Symbol/Enviorment';
import { Type } from "../Abstract/Retorno";
import { MiError, TypeError } from '../Errores/Error';


export class For extends Instruction{
    constructor(private asignacion:Instruction, private condicion:Expression, private incremento:Expression, private code:Instruction, line:number, column:number ){
        super(line,column);
    }

    public execute(environment:Environment){
        this.asignacion.execute(environment);
        let cond = this.condicion.execute(environment);
        if(cond.type == Type.BOOLEAN){
            while(cond.value == true){
                const element = this.code.execute(environment);
                if(element != null || element != undefined){
                    if(element.type == Type.BREAK){
                        break;
                    }else if(element.type == Type.CONTINUE){
                        cond = this.condicion.execute(environment);
                        continue;
                    }
                    else{
                        return element;
                    }
                }
                this.incremento.execute(environment);
                cond = this.condicion.execute(environment);
                if(cond.type != Type.BOOLEAN){
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA EXPRESION RECIBIDA NO ES DE TIPO BOOLEAN");
                }
            }
        }else{
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA CONDICION DEBE RETORNAR UN VALOR DE TIPO BOOLEANO");
        }
    }
}