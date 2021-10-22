import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from '../Abstract/Expresiones';
import { Environment } from '../Symbol/Enviorment';
import { Case } from "./Case";
import { MiError, TypeError } from '../Errores/Error';
import { Type } from '../Abstract/Retorno';


export class Switch extends Instruction{
    constructor(private cambio:Expression, private casos:Array<Case>, line:number, column:number){
        super(line,column);
    }

    public execute(environment:Environment){
        let actual = this.cambio.execute(environment);
        for(let i = 0; i < this.casos.length; i++){
            let casoexp = this.casos[i].getExp();
            if(casoexp != null){
                let casoactual = casoexp.execute(environment);
                if(actual.type == casoactual.type){
                    if(actual.value == casoactual.value){
                        let element = this.casos[i].execute(environment);  
                        if(element != null || element != undefined){
                            if(element.type == Type.BREAK){
                                break;
                            }else{
                                return element;
                            }
                        } 
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "EL VALOR DEL CASE NO ES DEL MISMO TIPO QUE EL VALOR ASIGNADO EN EL SWITCH");
                }
            }else{
                let element = this.casos[i].execute(environment);  
                if(element != null || element != undefined){
                    if(element.type == Type.BREAK){
                        break;
                    }else{
                        return element;
                    }
                }  
            }
        }
    }

 
}