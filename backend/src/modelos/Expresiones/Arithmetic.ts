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
        const dominanteSuma = this.DominanteSuma(leftValue.type, rightValue.type);
        const dominanteResta = this.DominanteResta(leftValue.type, rightValue.type);
        const dominanteMultiplicacion = this.DominanteMultiplicacion(leftValue.type, rightValue.type);
        const dominanteDivision = this.DominanteDivision(leftValue.type, rightValue.type);
        const dominantePotencia = this.DominantePotencia(leftValue.type, rightValue.type);
        const dominanteModulo = this.DominanteModulo(leftValue.type, rightValue.type);
        const dominanteUnario = this.DominanteUnario(rightValue.type);
        let result:Retorno ={value:null,type:Type.NULL};
        
        if(this.type == ArithmeticOption.SUMA){
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
            if(dominanteResta == Type.INT){
                result = {value:(leftValue.value - rightValue.value), type: Type.INT};
            }else if(dominanteResta == Type.DOUBLE){
                result = {value:(leftValue.value - rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE RESTAR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.MULTIPLICACION){
            if(dominanteMultiplicacion == Type.INT){
                result = {value:(leftValue.value * rightValue.value), type: Type.INT};
            }else if(dominanteMultiplicacion == Type.DOUBLE){
                result = {value:(leftValue.value * rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE MULTIPLICAR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.DIVISION){
            if(rightValue.value == 0){
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE DIVIDIR UN NUMERO ENTRE 0");
            }else{
                if(dominanteDivision == Type.INT){
                    result = {value:(leftValue.value - rightValue.value), type: Type.INT};
                }else if(dominanteDivision == Type.DOUBLE){
                    result = {value:(leftValue.value - rightValue.value), type: Type.DOUBLE};
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE DIVIDIR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
                }
            }
        }else if(this.type == ArithmeticOption.POTENCIA){
            if(dominantePotencia == Type.INT){
                result = {value:(leftValue.value ** rightValue.value), type: Type.INT};
            }else if(dominantePotencia == Type.DOUBLE){
                result = {value:(leftValue.value ** rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE ELEVAR A LA POTENCIA LOS VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.MODULO){
            if(dominanteModulo == Type.INT){
                result = {value:(leftValue.value % rightValue.value), type: Type.INT};
            }else if(dominanteModulo == Type.DOUBLE){
                result = {value:(leftValue.value % rightValue.value), type: Type.DOUBLE};
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO ES POSIBLE CALCULAR EL MODULO DE VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }else if(this.type == ArithmeticOption.UNARIO){
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
}