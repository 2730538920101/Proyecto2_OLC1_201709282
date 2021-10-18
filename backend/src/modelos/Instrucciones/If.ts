import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from "../Abstract/Retorno";
import { MiError, TypeError } from '../Errores/Error';

export class If extends Instruction{

    constructor(private condition : Expression, private code : Instruction, private statement : Instruction | null | undefined,
        line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
        const condition = this.condition.execute(env);
        if(condition.type != Type.BOOLEAN){
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA CONDICION NO RETORNA UN VALOR BOOLEANO");
        }else{
            if(condition.value === true){
                return this.code.execute(env);
            }else if(condition.value === false){
                return this.statement?.execute(env);
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA CONDICION NO SE HA PODIDO EVALUAR");
            }
        }
    }
}