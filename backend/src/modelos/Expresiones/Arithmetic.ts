import { Expression } from "../Abstract/Expresiones";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Enviorment";
import { MiError, TypeError } from "../Errores/Error";

export enum ArithmeticOption{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO,
    UNARIO
}

export class Arithmetic extends Expression{
    constructor(private left:Expression, private right:Expression, private type:ArithmeticOption, line:number, column:number){
        super(line,column);
    }

    public execute(environment:Environment):Retorno{
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        let result:Retorno ={value:null,type:Type.NULL};
        
        if(this.type == ArithmeticOption.SUMA){
            const dominanteSuma = this.DominanteSuma(leftValue.type, rightValue.type);
            if(dominanteSuma == Type.STRING){
                result = {value:(leftValue.value.toString() + rightValue.value.toString()), type: Type.STRING};
            }else if(dominanteSuma == Type.INT){
                result = {value:(leftValue.value + rightValue.value), type: Type.INT};
            }else if(dominanteSuma == Type.DOUBLE){
                result = {value:(leftValue.value + rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE SUMAR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.RESTA){
            const dominanteResta = this.DominanteResta(leftValue.type, rightValue.type);
            if(dominanteResta == Type.INT){
                result = {value:(leftValue.value - rightValue.value), type: Type.INT};
            }else if(dominanteResta == Type.DOUBLE){
                result = {value:(leftValue.value - rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE RESTAR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.MULTIPLICACION){
            const dominanteMultiplicacion = this.DominanteMultiplicacion(leftValue.type, rightValue.type);
            if(dominanteMultiplicacion == Type.INT){
                result = {value:(leftValue.value * rightValue.value), type: Type.INT};
            }else if(dominanteMultiplicacion == Type.DOUBLE){
                result = {value:(leftValue.value * rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE MULTIPLICAR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.DIVISION){
            const dominanteDivision = this.DominanteDivision(leftValue.type, rightValue.type);
            if(rightValue.value == 0){
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE DIVIDIR UN NUMERO ENTRE 0");
            }else{
                if(dominanteDivision == Type.INT){
                    result = {value:(leftValue.value / rightValue.value), type: Type.INT};
                }else if(dominanteDivision == Type.DOUBLE){
                    result = {value:(leftValue.value / rightValue.value), type: Type.DOUBLE};
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE DIVIDIR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
                }
            }
        }else if(this.type == ArithmeticOption.POTENCIA){
            const dominantePotencia = this.DominantePotencia(leftValue.type, rightValue.type);
            if(dominantePotencia == Type.INT){
                result = {value:(leftValue.value ** rightValue.value), type: Type.INT};
            }else if(dominantePotencia == Type.DOUBLE){
                result = {value:(leftValue.value ** rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE ELEVAR A LA POTENCIA LOS VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.MODULO){
            const dominanteModulo = this.DominanteModulo(leftValue.type, rightValue.type);
            if(dominanteModulo == Type.INT){
                result = {value:(leftValue.value % rightValue.value), type: Type.INT};
            }else if(dominanteModulo == Type.DOUBLE){
                result = {value:(leftValue.value % rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE CALCULAR EL MODULO DE VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.UNARIO){
            const dominanteUnario = this.DominanteUnario(rightValue.type);
            if(dominanteUnario == Type.INT){
                result = {value: (leftValue.value-rightValue.value), type: Type.INT};
            }else if(dominanteUnario == Type.DOUBLE){
                result = {value:(leftValue.value-rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE REALIZAR LA OPERACION UNARIA DE VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }
        return result;    
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoArithmetic"+x.toString();
        const izq:{rama:string, nodo:string} = this.left.draw();
        const der:{rama:string, nodo:string} = this.right.draw();
        switch(this.type){
            case ArithmeticOption.SUMA:
                const rama1 = `
                ${nombreNodoPrincipal}[label="ARITHMETIC"];
                operador${nombreNodoPrincipal}[label = "+"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama1, nodo: nombreNodoPrincipal.toString()};
            case ArithmeticOption.RESTA:
                const rama2 = `
                ${nombreNodoPrincipal}[label="ARITHMETIC"];
                operador${nombreNodoPrincipal}[label = "-"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama2, nodo: nombreNodoPrincipal.toString()};
            case ArithmeticOption.MULTIPLICACION:
                const rama3 = `
                ${nombreNodoPrincipal}[label="ARITHMETIC"];
                operador${nombreNodoPrincipal}[label = "*"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama3, nodo: nombreNodoPrincipal.toString()};
            case ArithmeticOption.DIVISION:
                const rama4 = `
                ${nombreNodoPrincipal}[label="ARITHMETIC"];
                operador${nombreNodoPrincipal}[label = "/"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama4, nodo: nombreNodoPrincipal.toString()};
            case ArithmeticOption.POTENCIA:
                const rama5 = `
                ${nombreNodoPrincipal}[label="ARITHMETIC"];
                operador${nombreNodoPrincipal}[label = "ˆ"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama5, nodo: nombreNodoPrincipal.toString()};
            case ArithmeticOption.MODULO:
                const rama6 = `
                ${nombreNodoPrincipal}[label="ARITHMETIC"];
                operador${nombreNodoPrincipal}[label = "%"];
                ${izq.rama}
                ${der.rama}
                ${nombreNodoPrincipal} -> ${izq.nodo};
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama6, nodo: nombreNodoPrincipal.toString()};
            case ArithmeticOption.UNARIO:
                const rama7 = `
                ${nombreNodoPrincipal}[label="ARITHMETIC"];
                operador${nombreNodoPrincipal}[label = "-"];
                ${der.rama}
                ${nombreNodoPrincipal} -> operador${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${der.nodo};
                `;
                return {rama: rama7, nodo: nombreNodoPrincipal.toString()};
        }
    }
}