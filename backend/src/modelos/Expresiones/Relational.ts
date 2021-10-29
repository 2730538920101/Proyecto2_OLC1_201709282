import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from '../Abstract/Expresiones';
import { MiError, TypeError } from "../Errores/Error";

export enum RelationalOption{
    IGUAL_IGUAL,
    DIFERENCIA,
    MENOR,
    MENOR_IGUAL,
    MAYOR,
    MAYOR_IGUAL
}

export class Relational extends Expression{
    constructor(private left: Expression, private right: Expression, private type : RelationalOption, line: number, column: number){
        super(line,column);
    }

    public execute(environment : Environment) : Retorno{
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        if(this.type == RelationalOption.IGUAL_IGUAL){
            const result = (leftValue.value == rightValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else if(this.type == RelationalOption.DIFERENCIA){
            const result = (leftValue.value != rightValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else if(this.type == RelationalOption.MENOR){
            const result = (leftValue.value < rightValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else if(this.type == RelationalOption.MENOR_IGUAL){
            const result = (leftValue.value <= rightValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else if(this.type == RelationalOption.MAYOR){
            const result = (leftValue.value > rightValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else if(this.type == RelationalOption.MAYOR_IGUAL){
            const result = (leftValue.value >= rightValue.value);
            return {value : result, type : Type.BOOLEAN};
        }else{
            return {value:null, type : Type.NULL};
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoRelational"+x.toString();
        const izq:{rama:string, nodo:string} = this.left.draw();
        const der:{rama:string, nodo:string} = this.right.draw();
        switch(this.type){
            case RelationalOption.DIFERENCIA:
                const rama1 = `
                ${nombreNodoPrincipal}[label="RELATIONAL"];
                operador${nombreNodoPrincipal}[label = "!="];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama1, nodo: nombreNodoPrincipal.toString()};
            case RelationalOption.IGUAL_IGUAL:
                const rama2 = `
                ${nombreNodoPrincipal}[label="RELATIONAL"];
                operador${nombreNodoPrincipal}[label = "=="];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama2, nodo: nombreNodoPrincipal.toString()};
            case RelationalOption.MAYOR:
                const rama3 = `
                ${nombreNodoPrincipal}[label="RELATIONAL"];
                operador${nombreNodoPrincipal}[label = ">"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama3, nodo: nombreNodoPrincipal.toString()};
            case RelationalOption.MAYOR_IGUAL:
                const rama4 = `
                ${nombreNodoPrincipal}[label="RELATIONAL"];
                operador${nombreNodoPrincipal}[label = ">="];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama4, nodo: nombreNodoPrincipal.toString()};
            case RelationalOption.MENOR:
                const rama5 = `
                ${nombreNodoPrincipal}[label="RELATIONAL"];
                operador${nombreNodoPrincipal}[label = "<"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama5, nodo: nombreNodoPrincipal.toString()};
            case RelationalOption.MENOR_IGUAL:
                const rama6 = `
                ${nombreNodoPrincipal}[label="RELATIONAL"];
                operador${nombreNodoPrincipal}[label = "<="];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama6, nodo: nombreNodoPrincipal.toString()};
        }
    }
}