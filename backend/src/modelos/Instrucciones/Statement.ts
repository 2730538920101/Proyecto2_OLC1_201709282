import { Instruction } from "../Abstract/Instrucciones";
import { Environment } from "../Symbol/Enviorment";
import { errores } from "../Errores/ErrorList";
import { TablaSim } from "../Reportes/TablaSimbolos";

export class Statement extends Instruction{

    constructor(private code : Array<Instruction>, line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
        const newEnv = new Environment(env);
        for(const instr of this.code){
            try {
                const element = instr.execute(newEnv);
                if(element != undefined || element != null)
                    return element;                
            } catch (MiError:any) {
                errores.push(MiError);
            }
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoStatement"+x.toString();
        let rama = ``;
        for(let i = 0; i < this.code.length; i++){
            let inst: {rama: string, nodo: string} = this.code[i].draw();
            rama = rama + `
            ${nombreNodoPrincipal}[label = "STATEMENT"];
            ${inst.rama}
            ${nombreNodoPrincipal} -> ${inst.nodo};
            `;
        }
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}