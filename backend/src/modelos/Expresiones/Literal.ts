import { Expression } from "../Abstract/Expresiones";
import { Retorno, Type } from "../Abstract/Retorno";

export class Literal extends Expression{
    
    constructor(private value : any, line : number, column: number, private type : number){
        super(line, column);
    }

    public execute() : Retorno{
        if(this.type == 0){
            console.log(this.value);
            return {value : Number(this.value), type : Type.INT};
        }else if(this.type == 1){
            console.log(this.value);
            return {value : Number(this.value), type : Type.DOUBLE};
        }else if(this.type == 2){
            console.log(this.value);
            return {value : this.value.toString().toLowerCase(), type : Type.BOOLEAN};
        }else if(this.type == 3){
            console.log(this.value);
            return {value : this.value.charCodeAt(0), type : Type.CHAR};
        }else if(this.type == 4){
            console.log(this.value);
            return {value : this.value, type : Type.STRING};
        }else{
            console.log(this.value);
            return {value : null , type : Type.NULL};
        }
    }
}
