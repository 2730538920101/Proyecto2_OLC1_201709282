import { Symbol } from './Symbol';
import { Type } from "../Abstract/Retorno";
import { Function } from "../Instrucciones/Function";
import { TablaSim } from "../Reportes/TablaSimbolos";

export class Environment{
    public variables : Map<string, Symbol>;
    public funciones : Map<string, Function>;

    constructor(public anterior : Environment | null){
        this.variables = new Map();
        this.funciones = new Map();
    }
    public guardar(id: string, valor: any, type: Type){
        let env : Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                const sim = new Symbol("VARIABLE", id, type);
                TablaSim.push(sim);
                env.variables.set(id, new Symbol(valor, id, type));
                return;
            }
            env = env.anterior;
        }
        const sim2 = new Symbol("VARIABLE", id, type);
        this.variables.set(id, new Symbol(valor, id, type));
        TablaSim.push(sim2);
    }

    public guardarFuncion(id: string, funcion : Function){
        let env : Environment | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                const sim = new Symbol("FUNCION", id, funcion.type);
                TablaSim.push(sim);
                this.funciones.set(id, funcion);
                return;
            }
            env = env.anterior;
        }
        const sim2 = new Symbol("FUNCION", id, funcion.type);
        TablaSim.push(sim2);
        this.funciones.set(id, funcion);        
    }

    public getVar(id: string) : Symbol | undefined | null{
        let env : Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }   

    
    public getFuncion(id: string) : Function | undefined{
        let env : Environment | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    
    public getGlobal() : Environment{
        let env : Environment | null = this;
        while(env?.anterior != null){
            env = env.anterior;
        }
        return env;
    }
}


