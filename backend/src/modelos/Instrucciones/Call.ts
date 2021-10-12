import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";
import { MiError, TypeError } from '../Errores/Error';

export enum TypeCall{
    DECLARED,
    SETVALUE,
    WRITELINE,
    APPEND,
    START
}

export class Call extends Instruction{

    constructor(private id: string, private expresiones : Array<Expression>, private type:TypeCall, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        let contInicio = 0;
        switch(this.type){
            case TypeCall.DECLARED:
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
                        func.statment.execute(newEnv);
                        break;
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO TIENE LA MISMA CANTIDAD DE PARAMETROS INGRESADOS");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                }
            case TypeCall.START:
                contInicio++;
                if(contInicio < 1){
                    const func2 = environment.getFuncion(this.id);
                    if(func2 != undefined){
                        if(this.expresiones.length != func2?.parametros.length){
                            const newEnv = new Environment(environment.getGlobal());
                            for(let i = 0; i < this.expresiones.length; i++){
                                const value = this.expresiones[i].execute(environment);
                                const param = func2.parametros[i].execute(environment);
                                if(value.type == param.type){
                                    newEnv.guardar(param.value, value.value, value.type);
                                }else{
                                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LOS PARAMETROS INGRESADOS EN LA LLAMADA NO SON DEL MISMO TIPO QUE EN LA DECLARACION");
                                }
                            }
                            func2.statment.execute(newEnv);
                            break;
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO TIENE LA MISMA CANTIDAD DE PARAMETROS INGRESADOS");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "SOLO PUEDE INICIAR EL SISTEMA UNA VEZ POR EJECUCION");
                }
            
            case TypeCall.WRITELINE:
                if(this.expresiones.length == 1){
                    const imprimir = this.expresiones[0].execute(environment);
                    console.log(imprimir);
                    break;
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION WRITELINE SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCall.SETVALUE:

            case TypeCall.APPEND:
        }
    }
}