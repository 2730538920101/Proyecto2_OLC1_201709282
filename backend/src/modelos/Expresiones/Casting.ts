import { Retorno, Type } from "../Abstract/Retorno";
import { Expression } from "../Abstract/Expresiones";
import { Environment } from "../Symbol/Enviorment";
import { MiError, TypeError } from "../Errores/Error";

export class Casting extends Expression{
    constructor(private changeTo:Type, private value:Expression, line:number, column:number){
        super(line, column);
    }

    public execute(environment:Environment):Retorno{
        const exptype = this.value.execute(environment).type;
        const val = this.value.execute(environment).value;
        switch(this.changeTo){
            case Type.INT:  
                if(exptype == Type.DOUBLE){
                    return {value:parseInt(val, 10), type: Type.INT};
                }else if(exptype == Type.CHAR){
                    return {value: parseInt(String.fromCharCode(val),10) , type:Type.INT};
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO "+ exptype + " AL TIPO " + this.changeTo);
                }                
            case Type.DOUBLE:
                if(exptype == Type.INT){
                    return {value:parseFloat(val), type: Type.DOUBLE};
                }else if(exptype == Type.CHAR){
                    let ent = parseInt(val,10);
                    return {value: parseFloat(String.fromCharCode(ent)) , type:Type.DOUBLE}; 
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO "+ exptype + " AL TIPO " + this.changeTo);
                }     
            case Type.CHAR:
                if(exptype == Type.INT){
                    return {value: parseInt(val.CharCodeAt(0),10) , type:Type.CHAR};
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO "+ exptype + " AL TIPO " + this.changeTo);
                }         
            default:
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO "+ this.changeTo);

        }
        
    }
}
