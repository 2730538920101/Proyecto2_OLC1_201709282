import { Environment } from "../Symbol/Enviorment";
import { MiError, TypeError } from '../Errores/Error';
import { Retorno } from '../Abstract/Retorno';
import { Instruction } from '../Abstract/Instrucciones';




export class ArithmeticAccessI2 extends Instruction{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public execute(environment: Environment){
        const value = environment.getVar(this.id);
        if(value == null){
            throw new MiError(this.line,this.column, TypeError.SEMANTICO, "LA VARIABLE NO EXISTE");
        }else{
            value.valor = Number(value.valor)-1;
            environment.guardar(this.id, value.valor, value.type);
        }
    }
}