import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from '../Abstract/Expresiones';

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
}

