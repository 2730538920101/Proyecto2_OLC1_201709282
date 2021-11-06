import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { Type } from "../Abstract/Retorno";
import { Symbol } from '../Symbol/Symbol';
import { MiError, TypeError } from "../Errores/Error";
import { Instruction } from '../Abstract/Instrucciones';

export class AccessListAssigment extends Instruction {

    constructor(private anterior: Array<string>, private index: Expression, private value:Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment){
        for(let i =0; i<this.anterior.length; i++){
            let anterior = environment.getVar(this.anterior[i]);
            if(anterior){
                if (anterior.type != Type.LIST){
                    throw new MiError(this.line, this.column,TypeError.SEMANTICO, "NO ES UNA LISTA");
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

    public draw() : {rama : string, nodo: string}{
        const indexExp:{rama: string, nodo: string} = this.index.draw();
        const expExp:{rama: string, nodo: string} = this.value.draw();
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoAccesListAssigment"+x.toString();
        const rama = `
        ${nombreNodoPrincipal}[label = "AccesListAssigment"];
        nodoid${nombreNodoPrincipal}[label = "ID"];
        nodoidval${nombreNodoPrincipal}[label = ${this.anterior[0]}];
        ${indexExp.rama}
        ${expExp.rama}
        ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> ${indexExp.nodo};
        ${nombreNodoPrincipal} -> ${expExp.nodo};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}