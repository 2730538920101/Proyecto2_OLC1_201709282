import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from "../Abstract/Retorno";
import { MiError , TypeError} from '../Errores/Error';

export class While extends Instruction{
    constructor(private condition : Expression, private code : Instruction, line : number, column : number){
        super(line, column);
    }
    public execute(env : Environment) {
        let condition = this.condition.execute(env);
        if(condition.type != Type.BOOLEAN){
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA EXPRESION RECIBIDA NO ES DE TIPO BOOLEAN");
        }else{
            while(condition.value == true){
                const element = this.code.execute(env);
                if(element != null || element != undefined){
                    if(element.type == Type.BREAK){
                        break;
                    }else if(element.type == Type.CONTINUE){
                        condition = this.condition.execute(env);
                        continue;
                    }
                    else{
                        return element;
                    }
                }
                condition = this.condition.execute(env);
                if(condition.type != Type.BOOLEAN){
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA EXPRESION RECIBIDA NO ES DE TIPO BOOLEAN");
                }
            }
        }
    }
}