import { Instruction } from '../Abstract/Instrucciones';
import { Assigment } from './Assigment';
import { Environment } from '../Symbol/Enviorment';
import { MiError, TypeError } from '../Errores/Error';
import { Type } from '../Abstract/Retorno';

export class Declaration extends Instruction{
    constructor(private type:Type,private asignacion:Assigment, line:number, column:number){
        super(line, column);
    }
    public execute(environment:Environment){
        if(this.type != Type.NULL){
            let tipo = this.asignacion.getType(environment);
            if(tipo == this.type){
                this.asignacion.execute(environment);
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE DECLARAR LA VARIABLE PORQUE EL TIPO DE LA EXPRESION ASIGNADA NO COINCIDE CON EL TIPO DE LA DECLARACION");
            }
        }
    }

}