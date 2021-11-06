import { Instruction } from '../Abstract/Instrucciones';
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";
import { MiError, TypeError } from '../Errores/Error';
import { Type } from '../Abstract/Retorno';
import { Symbol } from '../Symbol/Symbol';
import { List } from '../Symbol/List';

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
                    if(lengthval.type == Type.STRING){
                        return {value:lengthval.value.toString().length, type:Type.INT};
                    }else if(lengthval.type == Type.RETURN){
                        if(lengthval.value.type == Type.STRING){
                            return {value:lengthval.value.value.toString().length, type:Type.INT};
                        }else if(lengthval.value.type == Type.LIST){
                            return {value:lengthval.value.value.values.length, type:Type.INT};
                        }else if(lengthval.value.type == Type.ARRAY){
                            return {value:lengthval.value.value.values.length, type:Type.INT};
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING, DYNAMIC LIST O ARRAY");    
                        }
                    }else if(lengthval.type == Type.LIST){
                            return {value:lengthval.value.values.length, type:Type.INT};
                    }else if(lengthval.type == Type.ARRAY){
                        return {value:lengthval.value.values.length, type:Type.INT};
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
                        let arr = tochararrayval.value.split('');
                        let val = [];
                        for(let i =0; i<arr.length; i++){
                            let sim = new Symbol(arr[i], '', Type.CHAR);
                            val.push(sim);
                        }
                        let li = new List(Type.CHAR);
                        li.setValues(val);
                        return {value:li,type:Type.LIST};
                    }else if(tochararrayval.type == Type.RETURN){
                        if(tochararrayval.value.type == Type.STRING){
                            let arr = tochararrayval.value.split('');
                            let val = [];
                            for(let i =0; i<arr.length; i++){
                                let sim = new Symbol(arr[i], '', Type.CHAR);
                                val.push(sim);
                            }
                            let li = new List(Type.CHAR);
                            li.setValues(val);
                            return {value:li,type:Type.LIST};
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
                let truncateval = this.expresiones[0].execute(environment);
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
                let typeofval = this.expresiones[0].execute(environment);
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
                    let variable = environment.getVar(this.id);
                    if(variable?.type == Type.LIST){
                        let indice = this.expresiones[0].execute(environment)
                        if(indice.type == Type.INT){
                            let seleccionado = variable.valor.getValue(indice.value);
                            return { value: seleccionado.valor, type:seleccionado.type};
                        }else{
                            throw new MiError(this.line,this.column, TypeError.SEMANTICO, "EL SEGUNDO PARAMETRO QUE RECIBE LA FUNCION GETVALUE DEBE SER UN ENTERO");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "EL PRIMER PARAMETRO QUE RECIBE LA FUNCION GETVALUE DEBE SER UNA VARIABLE DE TIPO DYNAMIC LIST");
                    }     
        } 
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoCallExp"+x.toString();
        switch(this.type){
            case TypeCallExp.GETVALUE:
                const expExp: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama1 = `
                ${nombreNodoPrincipal}[label="GETVALUE"];
                nodoid${nombreNodoPrincipal}[label="getValue"];
                nodoparam${nombreNodoPrincipal}[label="ID"];
                nodoparamval${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> nodoparam${nombreNodoPrincipal} -> nodoparamval${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp.nodo};
                `;
                return {rama: rama1, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.TOLOWER:
                const expExp2: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama2 = `
                ${nombreNodoPrincipal}[label="TOLOWER"];
                nodoid${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp2.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp2.nodo};
                `;
                return {rama: rama2, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.TOUPPER:
                const expExp3: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama3 = `
                ${nombreNodoPrincipal}[label="TOUPPER"];
                nodoid${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp3.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp3.nodo};
                `;
                return {rama: rama3, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.LENGTH:
                const expExp4: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama4 = `
                ${nombreNodoPrincipal}[label="LENGTH"];
                nodoid${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp4.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp4.nodo};
                `;
                return {rama: rama4, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.TRUNCATE:
                const expExp5: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama5 = `
                ${nombreNodoPrincipal}[label="TRUNCATE"];
                nodoid${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp5.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp5.nodo};
                `;
                return {rama: rama5, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.ROUND:
                const expExp6: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama6 = `
                ${nombreNodoPrincipal}[label="ROUND"];
                nodoid${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp6.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp6.nodo};
                `;
                return {rama: rama6, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.TOSTRING:
                const expExp7: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama7 = `
                ${nombreNodoPrincipal}[label="TOSTRING"];
                nodoid${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp7.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp7.nodo};
                `;
                return {rama: rama7, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.TOCHARARRAY:
                const expExp8: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama8 = `
                ${nombreNodoPrincipal}[label="TOCHARARRAY"];
                nodoid${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp8.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp8.nodo};
                `;
                return {rama: rama8, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.TYPEOF:
                const expExp9: {rama:string, nodo:string} = this.expresiones[0].draw();
                const rama9 = `
                ${nombreNodoPrincipal}[label="TYPEOF"];
                nodoid${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp9.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp9.nodo};
                `;
                return {rama: rama9, nodo: nombreNodoPrincipal.toString()};
            case TypeCallExp.DECLARED:
                let params2 = ``;
                for(let i = 0; i < this.expresiones.length; i ++){
                    let actual:{rama: string, nodo: string} = this.expresiones[i].draw();
                    params2 = params2 + `
                    nodoparam${nombreNodoPrincipal}${i}[label="PARAMETRO"];
                    ${actual.rama}
                    ${nombreNodoPrincipal} -> nodoparam${nombreNodoPrincipal}${i} -> ${actual.nodo};
                    `; 
                }
                
                const rama10 = `
                ${nombreNodoPrincipal}[label="DECLARED"];
                nodoid${nombreNodoPrincipal}[label="ID"];
                nodoidval${nombreNodoPrincipal}[label="${this.id}"];
                ${params2}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
                `;
                return {rama: rama10, nodo: nombreNodoPrincipal.toString()};
        }
        
    }
}