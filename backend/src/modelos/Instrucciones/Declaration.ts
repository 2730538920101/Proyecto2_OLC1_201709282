import { Instruction } from '../Abstract/Instrucciones';
import { Environment } from '../Symbol/Enviorment';
import { MiError, TypeError } from '../Errores/Error';
import { Type } from '../Abstract/Retorno';

export class Declaration extends Instruction{
    constructor(private type:Type,private asignacion:any, line:number, column:number){
        super(line, column);
    }
    public execute(environment:Environment){
        try{
            let tipo = this.asignacion.getType(environment);
            let id = this.asignacion.getId();
            if(tipo == this.type){
                environment.guardar(id, null, this.type);
                this.asignacion.execute(environment);
            }else{
                throw new MiError(this.line, this.column, TypeError.SEMANTICO, "NO SE PUEDE DECLARAR LA VARIABLE PORQUE EL TIPO DE LA EXPRESION ASIGNADA NO COINCIDE CON EL TIPO DE LA DECLARACION");
            }
        }catch(e){
            for(let i = 0; i < this.asignacion.length; i++){
                let iden = this.asignacion[i];
                if(iden){
                    environment.guardar(iden, null, this.type);
                }else{
                    throw new MiError(this.line, this.column, TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
                }    
            }
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoDeclaration"+x.toString();
        try{
            const assigval2: {rama: string, nodo: string} = this.asignacion.draw();
            let assigval = ``;
            assigval = assigval + assigval2.rama + `
            ${nombreNodoPrincipal} -> ${assigval2.nodo};
            `;
            const rama = `
            ${nombreNodoPrincipal}[label="DECLARATION"];
            nodotipo${nombreNodoPrincipal}[label="TIPO DE DATO"];
            nodotipoval${nombreNodoPrincipal}[label="${this.type.toString()}"];
            ${assigval}
            ${nombreNodoPrincipal} -> nodotipo${nombreNodoPrincipal} -> nodotipoval${nombreNodoPrincipal};
            `;
            return {rama: rama, nodo: nombreNodoPrincipal.toString()};
        }catch(e){
            const rama = `
            ${nombreNodoPrincipal}[label="DECLARATION"];
            nodotipo${nombreNodoPrincipal}[label="TIPO DE DATO"];
            nodotipoval${nombreNodoPrincipal}[label="${this.type.toString()}"];
            ${nombreNodoPrincipal} -> nodotipo${nombreNodoPrincipal} -> nodotipoval${nombreNodoPrincipal};
            `;
            return {rama: rama, nodo: nombreNodoPrincipal.toString()};
        }    
    }
}

