import { Instruction } from "../Abstract/Instrucciones";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from '../Abstract/Retorno';
import { MiError , TypeError} from '../Errores/Error';

export class DoWhile extends Instruction{
    constructor(private condition : Expression, private code : Instruction, line : number, column : number){
        super(line, column);
    }
    public execute(env : Environment) {
        let condition = this.condition.execute(env);
        if(condition.type != Type.BOOLEAN){
            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA EXPRESION RECIBIDA NO ES DE TIPO BOOLEAN");
        }else{
            do{
                const element = this.code.execute(env);
                if(element != null || element != undefined){
                    console.log(element);
                    if(element.type == Type.BREAK)
                        break;
                    else if(element.type == Type.CONTINUE){
                        condition = this.condition.execute(env);
                        continue;
                    }
                    else
                        return element;
                }
                condition = this.condition.execute(env);
                if(condition.type != Type.BOOLEAN){
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA EXPRESION RECIBIDA NO ES DE TIPO BOOLEAN");
                }
            }while(condition.value == true);
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoDoWhile"+x.toString();
        const condicion: {rama: string, nodo: string} = this.condition.draw();
        const inst: {rama: string, nodo: string} = this.code.draw(); 
        const rama = `
        ${nombreNodoPrincipal}[label="DO WHILE"];
        ${condicion.rama}
        ${inst.rama}
        ${nombreNodoPrincipal} -> ${condicion.nodo};
        ${nombreNodoPrincipal} -> ${inst.nodo};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}