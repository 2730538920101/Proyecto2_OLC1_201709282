export enum Type{
    INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4,
    NULL = 5,
    ARRAY = 6,
    LIST = 7,
    RETURN = 8,
    BREAK = 9,
    CONTINUE = 10
}

export type Retorno ={
    value : any,
    type : Type
}