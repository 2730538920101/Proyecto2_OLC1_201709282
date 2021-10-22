import { Symbol } from "./Symbol";

export class MiArray{
    public values : Symbol[];

    constructor(){
        this.values = [];
    }

    public getValue(index: number){
        return this.values[index];
    }

    public setValue(index: number, value: Symbol){
        this.values[index] = value;
    }
}