import { Environment } from "../Symbol/Enviorment";
import { Type, Retorno } from '../Abstract/Retorno';
import { Expression } from '../Abstract/Expresiones';

export class Params extends Expression{
    constructor(private id:string, private type:Type, line:number, column:number){
        super(line, column);
    }
    public execute(environment: Environment):Retorno{
        environment.guardar(this.id,"", this.type);
        return {value:this.id, type:this.type};
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoParametro"+x.toString();
        const rama = `
        ${nombreNodoPrincipal}[label="Parametro"];
        nodoid${nombreNodoPrincipal}[label="ID"];
        nodoidval${nombreNodoPrincipal}[label="${this.id}"];
        tipodato${nombreNodoPrincipal}[label="TIPO DE DATO"];
        tipodatoval${nombreNodoPrincipal}[label="${this.type.toString()}"];
        ${nombreNodoPrincipal} -> nodoid${nombreNodoPrincipal} -> nodoidval${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> tipodato${nombreNodoPrincipal} -> tipodatoval${nombreNodoPrincipal};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}

