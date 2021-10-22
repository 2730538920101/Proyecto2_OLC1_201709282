import { Type } from '../Abstract/Retorno';
import { Symbol } from './Symbol';

export class List{
    public values : Symbol[];

    constructor(public type:Type){
        this.values = [];
    }

    public getValue(index: number){
        return this.values[index];
    }

    public setValue(index: number, value: Symbol){
        this.values[index] = value;
    }

    public append(value: Symbol){
        this.values.push(value);
    }

}