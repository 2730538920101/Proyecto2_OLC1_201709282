"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
var TablaTipos_1 = require("../Util/TablaTipos");
var Expression = /** @class */ (function () {
    function Expression(line, column) {
        this.line = line;
        this.column = column;
    }
    Expression.prototype.DominanteSuma = function (tipo1, tipo2) {
        var type = TablaTipos_1.TablaSuma[tipo1][tipo2];
        return type;
    };
    Expression.prototype.DominanteResta = function (tipo1, tipo2) {
        var type = TablaTipos_1.TablaResta[tipo1][tipo2];
        return type;
    };
    Expression.prototype.DominanteMultiplicacion = function (tipo1, tipo2) {
        var type = TablaTipos_1.TablaMultiplicacion[tipo1][tipo2];
        return type;
    };
    Expression.prototype.DominanteDivision = function (tipo1, tipo2) {
        var type = TablaTipos_1.TablaDivision[tipo1][tipo2];
        return type;
    };
    Expression.prototype.DominantePotencia = function (tipo1, tipo2) {
        var type = TablaTipos_1.TablaPotencia[tipo1][tipo2];
        return type;
    };
    Expression.prototype.DominanteModulo = function (tipo1, tipo2) {
        var type = TablaTipos_1.TablaModulo[tipo1][tipo2];
        return type;
    };
    Expression.prototype.DominanteUnario = function (tipo1) {
        var type = TablaTipos_1.TablaUnario[tipo1][0];
        return type;
    };
    return Expression;
}());
exports.Expression = Expression;
