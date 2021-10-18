import { Retorno, Type } from "../Abstract/Retorno";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { MiError, TypeError } from "../Errores/Error";

export class Casting extends Expression{
    constructor(private changeTo:Type, private value:Expression, line:number, column:number){
        super(line, column);
    }

    public execute(environment:Environment):Retorno{
        let exptype = this.value.execute(environment).type;
        switch(this.changeTo){
            case Type.INT:  
                if(exptype == Type.DOUBLE){
                    let val = this.value.execute(environment).value;
                    return {value:parseInt(val, 10), type: Type.INT};
                }else if(exptype == Type.CHAR){
                    let val = this.value.execute(environment).value;
                    return {value: val , type:Type.INT};
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO "+ exptype + " AL TIPO " + this.changeTo);
                }                
            case Type.DOUBLE:
                if(exptype == Type.INT){
                    let val = this.value.execute(environment).value;
                    return {value:parseFloat(val.toString()).toFixed(2), type: Type.DOUBLE};
                }else if(exptype == Type.CHAR){
                    let val = this.value.execute(environment).value;
                    return {value: parseFloat(val.toString()).toFixed(2) , type:Type.DOUBLE}; 
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO "+ exptype + " AL TIPO " + this.changeTo);
                }    
            case Type.CHAR:
                if(exptype == Type.INT){
                    let val = this.value.execute(environment).value;
                    return {value: String.fromCharCode(val) , type:Type.CHAR};
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO "+ exptype + " AL TIPO " + this.changeTo);
                }       
            default:
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO "+ this.changeTo);

        }
        
    }
}
