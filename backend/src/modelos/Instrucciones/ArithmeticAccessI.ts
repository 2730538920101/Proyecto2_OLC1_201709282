import { Environment } from "../Symbol/Enviorment";
import { MiError, TypeError } from '../Errores/Error';
import { Instruction } from '../Abstract/Instrucciones';
import { Retorno } from '../Abstract/Retorno';




export class ArithmeticAccessI extends Instruction{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public execute(environment: Environment){
        const value = environment.getVar(this.id);
        if(value == null){
            throw new MiError(this.line,this.column, TypeError.SEMANTICO, "LA VARIABLE NO EXISTE");
        }else{
                value.valor = Number(value.valor)+1;
                environment.guardar(this.id, value.valor, value.type);
            }
    }
}