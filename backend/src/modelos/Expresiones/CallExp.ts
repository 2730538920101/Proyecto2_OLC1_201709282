import { Instruction } from '../Abstract/Instrucciones';
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";
import { MiError, TypeError } from '../Errores/Error';
import { Type } from '../Abstract/Retorno';

export enum TypeCallExp{
    GETVALUE,
    TOLOWER,
    TOUPPER,
    LENGTH,
    TRUNCATE,
    ROUND,
    TOSTRING,
    TOCHARARRAY,
    TYPEOF,
    DECLARED
}

export class CallExp extends Instruction{

    constructor(private id: string, private expresiones : Array<Expression>, private type: TypeCallExp, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment){
        switch(this.type){
            case TypeCallExp.DECLARED:
                const func = environment.getFuncion(this.id);
                if(func != undefined){
                    if(this.expresiones.length != func?.parametros.length){
                        const newEnv = new Environment(environment.getGlobal());
                        for(let i = 0; i < this.expresiones.length; i++){
                            const value = this.expresiones[i].execute(environment);
                            const param = func.parametros[i].execute(environment);
                            if(value.type == param.type){
                                newEnv.guardar(param.value, value.value, value.type);
                            }else{
                                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LOS PARAMETROS INGRESADOS EN LA LLAMADA NO SON DEL MISMO TIPO QUE EN LA DECLARACION");
                            }
                        }
                        const value = func.statment.execute(newEnv);
                        return value.value;
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO TIENE LA MISMA CANTIDAD DE PARAMETROS INGRESADOS");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                }    
            case TypeCallExp.LENGTH:
                const lengthval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(lengthval.type == Type.ARRAY || lengthval.type == Type.LIST || lengthval.type == Type.STRING){
                        return lengthval.value.lenght;
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING, DYNAMIC LIST O ARRAY");    
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.ROUND:
                const roundval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(roundval.type == Type.DOUBLE){
                        return Math.round(roundval.value);
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION ROUND SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION ROUND SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOCHARARRAY:
                const tochararrayval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(tochararrayval.type == Type.STRING){
                        return tochararrayval.value.split('');
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOCHARARRAY SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOCHARARRAY SOLO PUEDE RECIBIR UN PARAMETRO");
                }

            case TypeCallExp.TOLOWER:
                const tolowerval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(tolowerval.type == Type.STRING){
                        return tolowerval.value.toLowerCase();
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOLOWER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOLOWER SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOUPPER:
                const toupperval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(toupperval.type == Type.STRING){
                        return toupperval.value.toUpperCase();
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOUPPER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOUPPER SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOSTRING:
                const tostringval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(tostringval.type == Type.INT || tostringval.type == Type.DOUBLE){
                        return tostringval.value.toString();
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOSTRING SOLO PUEDE RECIBIR PARAMETROS DE TIPO INT O DOUBLE");    
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOSTRING SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TRUNCATE:
                const truncateval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(truncateval.type == Type.DOUBLE){
                        return Math.trunc(truncateval.value);
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TRUNCATE SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TRUNCATE SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TYPEOF:
                const typeofval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    return typeofval.type.toString();
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TYPEOF SOLO PUEDE RECIBIR UN PARAMETRO");  
                }
                case TypeCallExp.GETVALUE:         
        }
        
    }
}