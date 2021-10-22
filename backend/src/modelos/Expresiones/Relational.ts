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
}