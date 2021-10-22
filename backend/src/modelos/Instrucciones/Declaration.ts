import { Instruction } from '../Abstract/Instrucciones';
import { Assigment } from './Assigment';
import { Environment } from '../Symbol/Enviorment';
import { MiError, TypeError } from '../Errores/Error';
import { Type } from '../Abstract/Retorno';

export class Declaration extends Instruction{
    constructor(private type:Type,private asignacion:any, line:number, column:number){
        super(line, column);
    }
    public execute(environment:Environment){
        try{
            let tipo = this.asignacion.getType(environment);
            let id = this.asignacion.getId();
            if(tipo == this.type){
                environment.guardar(id, null, this.type);
                this.asignacion.execute(environment);
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE DECLARAR LA VARIABLE PORQUE EL TIPO DE LA EXPRESION ASIGNADA NO COINCIDE CON EL TIPO DE LA DECLARACION");
            }
        }catch(e){
            for(let i = 0; i < this.asignacion.length; i++){
                let iden = this.asignacion[i];
                if(iden){
                    environment.guardar(iden, null, this.type);
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
                }    
            }
        }
    }
}