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
    public contadorstart:number = 0;
    constructor(private id: string, private expresiones : Array<Expression>, private type:TypeCall, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        switch(this.type){
            case TypeCall.START:
                this.contadorstart++;
                if(this.column <= 1){
                    let start = environment.getFuncion(this.id);
                    if(start != undefined|| start !=null){
                        let newEnv = new Environment(environment.getGlobal());
                        if(start.parametros.length == this.expresiones.length){
                            for(let i = 0; i < this.expresiones.length; i++){
                                let value = this.expresiones[i].execute(environment);
                                let param = start.parametros[i].execute(environment);
                                if(value.type == param.type){
                                    newEnv.guardar(param.value, value.value, value.type);
                                }else{
                                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LOS PARAMETROS INGRESADOS EN LA LLAMADA NO SON DEL MISMO TIPO QUE EN LA DECLARACION");
                                }
                            }
                            start.statment.execute(newEnv);
                            break;
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION NO TIENE EL MISMO NUMERO DE PARAMETROS QUE LOS DATOS INGRESADOS");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION START SOLO SE PUEDE EJECUTAR UNA VEZ");
                }
            case TypeCall.DECLARED:
                let func = environment.getFuncion(this.id);
                if(func != undefined || func !=null){
                    let newEnv = new Environment(environment.getGlobal());
                    if(func.parametros.length == this.expresiones.length){
                        for(let i = 0; i < this.expresiones.length; i++){
                            let value = this.expresiones[i].execute(environment);
                            let param = func.parametros[i].execute(environment);
                            if(value.type == param.type){
                                newEnv.guardar(param.value, value.value, value.type);
                            }else{
                                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LOS PARAMETROS INGRESADOS EN LA LLAMADA NO SON DEL MISMO TIPO QUE EN LA DECLARACION");
                            }
                        }
                        func.statment.execute(newEnv);
                        break;
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION NO TIENE EL MISMO NUMERO DE PARAMETROS QUE LOS DATOS INGRESADOS");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                }
            case TypeCall.WRITELINE:
                const imprimir = this.expresiones[0].execute(environment).value;
                if(this.expresiones.length == 1){
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