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
                let func = environment.getFuncion(this.id);
                if(func != undefined || func !=null){
                    let newEnv = new Environment(environment.getGlobal());
                    if(this.expresiones.length == func.parametros.length){
                        for(let i = 0; i < this.expresiones.length; i++){
                            let value = this.expresiones[i].execute(environment);
                            let param = func.parametros[i].execute(environment);
                            if(value.type == param.type){
                                newEnv.guardar(param.value, value.value, value.type);
                            }else{
                                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LOS PARAMETROS INGRESADOS EN LA LLAMADA NO SON DEL MISMO TIPO QUE EN LA DECLARACION");
                            }
                        }
                        let value = func.statment.execute(newEnv);
                        if(value != undefined){
                            return value.value;
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO ESTA RETORNANDO EL VALOR");    
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO TIENE LA MISMA CANTIDAD DE PARAMETROS INGRESADOS");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                }    
            case TypeCallExp.LENGTH:
                let lengthval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(lengthval.type == Type.ARRAY || lengthval.type == Type.LIST || lengthval.type == Type.STRING){
                        return {value:lengthval.value.toString().length, type:Type.INT};
                    }else if(lengthval.type == Type.RETURN){
                        if(lengthval.value.type == Type.ARRAY || lengthval.value.type == Type.LIST || lengthval.value.type == Type.STRING){
                            return {value:lengthval.value.value.toString().length, type:Type.INT};
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING, DYNAMIC LIST O ARRAY");    
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING, DYNAMIC LIST O ARRAY");    
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.ROUND:
                let roundval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(roundval.type == Type.DOUBLE){
                        return {value:Math.round(roundval.value), type: Type.INT};
                    }else if(roundval.type == Type.RETURN){
                        if(roundval.value.type == Type.DOUBLE){
                            return {value:Math.round(roundval.value.value),type:Type.INT};
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION ROUND SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                        }
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
                        return {value:tochararrayval.value.split(''),type:Type.CHAR};
                    }else if(tochararrayval.type == Type.RETURN){
                        if(tochararrayval.value.type == Type.STRING){
                            return {value:tochararrayval.value.value.split(''),type:Type.CHAR};
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOCHARARRAY SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOCHARARRAY SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOCHARARRAY SOLO PUEDE RECIBIR UN PARAMETRO");
                }

            case TypeCallExp.TOLOWER:
                let tolowerval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(tolowerval.type == Type.STRING){
                        return {value:tolowerval.value.toLowerCase(), type:Type.STRING};
                    }else if(tolowerval.type == Type.RETURN){
                        if(tolowerval.value.type == Type.STRING){
                            return {value:tolowerval.value.value.toLowerCase(), type:Type.STRING};
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOLOWER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOLOWER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOLOWER SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOUPPER:
                let toupperval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(toupperval.type == Type.STRING){
                        return {value:toupperval.value.toUpperCase(),type:Type.STRING};
                    }else if(toupperval.type == Type.RETURN){
                        if(toupperval.value.type == Type.STRING){
                            return {value:toupperval.value.value.toUpperCase(),type:Type.STRING};
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOUPPER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOUPPER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOUPPER SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOSTRING:
                let tostringval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(tostringval.type == Type.INT || tostringval.type == Type.DOUBLE){
                        return {value:tostringval.value.toString() ,type: Type.STRING};
                    }else if(tostringval.type == Type.RETURN){
                        if(tostringval.value.type == Type.INT || tostringval.value.type == Type.DOUBLE){
                            return {value:tostringval.value.value.toString(), type:Type.STRING};
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TOSTRING SOLO PUEDE RECIBIR PARAMETROS DE TIPO INT O DOUBLE");   
                        }
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
                        return {value:Math.trunc(truncateval.value),type:Type.INT};
                    }else if(truncateval.type == Type.RETURN){
                        if(truncateval.value.type == Type.DOUBLE){
                            return {value:Math.trunc(truncateval.value.value),type:Type.INT};
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TRUNCATE SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TRUNCATE SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TRUNCATE SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TYPEOF:
                const typeofval = this.expresiones[0].execute(environment);
                if(this.expresiones.length == 1){
                    if(typeofval.type != Type.RETURN){
                        return {value:typeofval.type.toString(), type:Type.STRING};
                    }else{
                        return {value:typeofval.value.type.toString(), type:Type.STRING};
                    }  
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION TYPEOF SOLO PUEDE RECIBIR UN PARAMETRO");  
                }
                case TypeCallExp.GETVALUE:         
        }
        
    }
}