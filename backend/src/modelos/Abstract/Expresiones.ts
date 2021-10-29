import { Retorno, Type } from "./Retorno";
import { Environment } from "../Symbol/Enviorment";
import { TablaSuma, TablaResta, TablaMultiplicacion, TablaDivision, TablaPotencia, TablaModulo, TablaUnario } from "../Util/TablaTipos";

export abstract class Expression {

    public line: number;
    public column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract execute(environment: Environment) : Retorno;
    public abstract draw() : {rama: string, nodo: string};

    public DominanteSuma(tipo1 : Type, tipo2 : Type) : Type{
        const type = TablaSuma[tipo1][tipo2];
        return type;
    }

    public DominanteResta(tipo1 : Type, tipo2 : Type) : Type{
        const type = TablaResta[tipo1][tipo2];
        return type;
    }

    public DominanteMultiplicacion(tipo1 : Type, tipo2 : Type) : Type{
        const type = TablaMultiplicacion[tipo1][tipo2];
        return type;
    }
    
    public DominanteDivision(tipo1 : Type, tipo2 : Type) : Type{
        const type = TablaDivision[tipo1][tipo2];
        return type;
    }

    public DominantePotencia(tipo1 : Type, tipo2 : Type) : Type{
        const type = TablaPotencia[tipo1][tipo2];
        return type;
    }

    public DominanteModulo(tipo1 : Type, tipo2 : Type) : Type{
        const type = TablaModulo[tipo1][tipo2];
        return type;
    }

    public DominanteUnario(tipo1 : Type) : Type{
        const type = TablaUnario[tipo1][0];
        return type;
    }

}