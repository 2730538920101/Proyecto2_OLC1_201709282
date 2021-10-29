import { Expression } from "../Abstract/Expresiones";
import { Retorno, Type } from "../Abstract/Retorno";

export class Literal extends Expression{
    
    constructor(private value : any, line : number, column: number, private type : number){
        super(line, column);
    }

    public execute() : Retorno{
        if(this.type == 0){
            return {value : Number(this.value), type : Type.INT};
        }else if(this.type == 1){
            return {value : Number(this.value), type : Type.DOUBLE};
        }else if(this.type == 2){
            return {value : this.value.toString().toLowerCase(), type : Type.BOOLEAN};
        }else if(this.type == 3){
            return {value : this.value.charCodeAt(0), type : Type.CHAR};
        }else if(this.type == 4){
            return {value : this.value, type : Type.STRING};
        }else{
            return {value : null , type : Type.NULL};
        }
    }

    public draw() : {rama : string, nodo: string}{
        const x = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoPrincipal = "nodoLiteral"+x.toString();
        const rama = `
        ${nombreNodoPrincipal}[label="LITERAL"];
        nodoliteral${nombreNodoPrincipal}[label="${this.value.toString()}"];
        ${nombreNodoPrincipal} -> nodoliteral${nombreNodoPrincipal};
        `;
        return {rama: rama, nodo: nombreNodoPrincipal.toString()};
    }
}
