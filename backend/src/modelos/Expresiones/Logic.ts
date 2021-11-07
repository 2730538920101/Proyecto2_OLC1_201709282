import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from '../Abstract/Expresiones';
import { MiError, TypeError } from '../Errores/Error';

export enum LogicOption{
    AND,
    OR,
    NOT
}

export class Logic extends Expression{
    constructor(private left: Expression, private right: Expression, private type : LogicOption, line: number, column: number){
        super(line,column);
    }

    public execute(environment : Environment) : Retorno{
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        if(this.type == LogicOption.AND){
            const result = (leftValue.value && rightValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else if(this.type == LogicOption.OR){
            const result = (leftValue.value || rightValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else if(this.type == LogicOption.NOT){
            const result = !(leftValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else{
            return {value:null, type : Type.NULL};
        }
        
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoLogic"+x.toString();
        const izq:{rama:string, nodo:string} = this.left.draw();
        const der:{rama:string, nodo:string} = this.right.draw();
        switch(this.type){
            case LogicOption.AND:
                const rama1 = `
                ${nombreNodoPrincipal}[label="LOGIC"];
                operador${nombreNodoPrincipal}[label = "&&"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama1, nodo: nombreNodoPrincipal.toString()};
            case LogicOption.OR:
                const rama2 = `
                ${nombreNodoPrincipal}[label="LOGIC"];
                operador${nombreNodoPrincipal}[label = "||"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama2, nodo: nombreNodoPrincipal.toString()};
            case LogicOption.NOT:
                const rama3 = `
                ${nombreNodoPrincipal}[label="LOGIC"];
                operador${nombreNodoPrincipal}[label = "!"];
                ${izq.rama}
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${izq.nodo};
                `;
                return {rama: rama3, nodo: nombreNodoPrincipal.toString()};
        }
        
    }
}

