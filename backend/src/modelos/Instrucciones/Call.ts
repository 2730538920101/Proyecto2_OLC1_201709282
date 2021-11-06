import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { Expression } from "../Abstract/Expresiones";
import { MiError, TypeError } from '../Errores/Error';
import { Symbol } from "../Symbol/Symbol";
import { prints } from "../Reportes/Impresiones";
export let contadorstart:Array<Instruction> = new Array();

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
        switch(this.type){
            case TypeCall.START:
                contadorstart.push(this);
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
                let imprimir = this.expresiones[0].execute(environment).value;
                if(this.expresiones.length == 1){
                    prints.push(imprimir.toString());
                    console.log(imprimir);
                    break;
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION WRITELINE SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCall.SETVALUE:
                let variable = environment.getVar(this.id);
                if(variable){
                    if(this.expresiones.length == 2){
                        let indice = this.expresiones[0].execute(environment).value;
                        let elegido = variable.valor;
                        if(elegido.type == this.expresiones[1].execute(environment).type){
                            let simb = new Symbol(this.expresiones[1].execute(environment).value,this.id, elegido.type);
                            elegido.setValue(indice, simb);
                            break;
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "EL VALOR QUE DESEA INGRESAR NO ES DEL MISMO TIPO QUE LA LISTA");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION SETVALUE RECIBE COMO SEGUNDO PARAMETRO UN INDICE Y COMO TERCER PARAMETRO UN VALOR");
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION SETVALUE DEBE RECIBIR EL NOMBRE DE UNA VARIABLE COMO PRIMER PARAMETRO");
                }      
            case TypeCall.APPEND:
                let variable2 = environment.getVar(this.id);
                if(variable2){
                    if(this.expresiones.length == 1){
                        let valadd = this.expresiones[0].execute(environment);
                        let varadd = variable2.valor;
                        if(valadd != null || valadd != undefined){
                            if(varadd.type == valadd.type){
                                let sim = new Symbol(this.expresiones[0].execute(environment).value, this.id, valadd.type);
                                varadd.append(sim);
                                break
                            }else{
                                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "EL VALOR QUE DESEA INGRESAR NO ES DEL TIPO DE LA LISTA");    
                            }
                        }else{
                            throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA LISTA NO HA SIDO DECLARADA");
                        }
                    }else{
                        throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION APPEND SOLO PUEDE RECIBIR UN VALOR COMO SEGUNDO PARAMETRO");  
                    }
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA FUNCION APPEND DEBE RECIBIR EL NOMBRE DE UNA VARIABLE COMO PRIMER PARAMETRO");
                }
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoCall"+x.toString();
        switch(this.type){
            case TypeCall.START:
                let params = ``;
                for(let i = 0; i < this.expresiones.length; i ++){
                    let actual:{rama: string, nodo: string} = this.expresiones[i].draw();
                    params = params + `
                    nodoparam${nombreNodoPrincipal}${i}[label="PARAMETRO"];
                    ${actual.rama}
                    ${nombreNodoPrincipal} -> nodoparam${nombreNodoPrincipal}${i} -> ${actual.nodo};
                    `; 
                }
                
                const rama = `
                ${nombreNodoPrincipal}[label="START WITH"];
                nodoid${nombreNodoPrincipal}[label="ID"];
                nodoidval${nombreNodoPrincipal}[label="${this.id}"];
                ${params}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
                `;
                return {rama: rama, nodo: nombreNodoPrincipal.toString()};
            case TypeCall.DECLARED:
                let params2 = ``;
                for(let i = 0; i < this.expresiones.length; i ++){
                    let actual:{rama: string, nodo: string} = this.expresiones[i].draw();
                    params2 = params2 + `
                    nodoparam${nombreNodoPrincipal}${i}[label="PARAMETRO"];
                    ${actual.rama}
                    ${nombreNodoPrincipal} -> nodoparam${nombreNodoPrincipal}${i} -> ${actual.nodo};
                    `; 
                }
                
                const rama2 = `
                ${nombreNodoPrincipal}[label="DECLARED"];
                nodoid${nombreNodoPrincipal}[label="ID"];
                nodoidval${nombreNodoPrincipal}[label="${this.id}"];
                ${params2}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
                `;
                return {rama: rama2, nodo: nombreNodoPrincipal.toString()};
            case TypeCall.WRITELINE:
                const expExp: {rama: string, nodo: string} = this.expresiones[0].draw(); 
                const rama3 = `
                ${nombreNodoPrincipal}[label="WRITELINE"];
                nodoid${nombreNodoPrincipal}[label="ID"];
                nodoidval${nombreNodoPrincipal}[label="${this.id}"];
                ${expExp.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${expExp.nodo};
                `;
                return {rama: rama3, nodo: nombreNodoPrincipal.toString()};
            case TypeCall.SETVALUE:
                const pos: {rama: string, nodo: string} = this.expresiones[0].draw();
                const val: {rama: string, nodo: string} = this.expresiones[1].draw();
                const rama4 = `
                ${nombreNodoPrincipal}[label="SETVALUE"];
                nodoid${nombreNodoPrincipal}[label="ID"];
                nodoidval${nombreNodoPrincipal}[label="setValue"];
                nodoidlist${nombreNodoPrincipal}[label="ID"];
                nodoidlistval${nombreNodoPrincipal}[label="${this.id}"];
                ${pos.rama}
                ${val.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> nodoidlist${nombreNodoPrincipal} -> nodoidlistval${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${pos.nodo};
                ${nombreNodoPrincipal} -> ${val.nodo};
                `;
                return {rama: rama4, nodo: nombreNodoPrincipal.toString()};
            case TypeCall.APPEND:
                const val2: {rama: string, nodo: string} = this.expresiones[0].draw();
                const rama5 = `
                ${nombreNodoPrincipal}[label="APPEND"];
                nodoid${nombreNodoPrincipal}[label="ID"];
                nodoidval${nombreNodoPrincipal}[label="append"];
                nodoidlist${nombreNodoPrincipal}[label="ID"];
                nodoidlistval${nombreNodoPrincipal}[label="${this.id}"];
                ${val2.rama}
                ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> nodoidlist${nombreNodoPrincipal} -> nodoidlistval${nombreNodoPrincipal};
                ${nombreNodoPrincipal} -> ${val2.nodo};
                `;
                return {rama: rama5, nodo: nombreNodoPrincipal.toString()};
        }
    }
}