"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCleanArray = void 0;
var Expresiones_1 = require("../Abstract/Expresiones");
var Retorno_1 = require("../Abstract/Retorno");
var Array_1 = require("../Symbol/Array");
var Symbol_1 = require("../Symbol/Symbol");
var Error_1 = require("../Errores/Error");
var NewCleanArray = /** @class */ (function (_super) {
    __extends(NewCleanArray, _super);
    function NewCleanArray(expr, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.expr = expr;
        _this.type = type;
        return _this;
    }
    NewCleanArray.prototype.execute = function (environment) {
        var array = new Array_1.MiArray();
        var value = this.expr.execute(environment);
        if (value.type == Retorno_1.Type.INT) {
            for (var i = 0; i < value.value; i++) {
                array.setValue(i, new Symbol_1.Symbol(0, '', this.type));
            }
            return { value: array, type: Retorno_1.Type.ARRAY };
        }
        else {
            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE HA PODIDO INSTANCIAR EL ARREGLO PORQUE LA EXPRESION ENTRE LAS LLAVES NO ES UN NUMERO");
        }
    };
    NewCleanArray.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoNewCleanArray" + x.toString();
        var cant = this.expr.draw();
        var rama = "\n        " + nombreNodoPrincipal + "[label=\"Array\"];\n        tipodato" + nombreNodoPrincipal + "[label=\"TIPO DE DATO\"];\n        tipodatoval" + nombreNodoPrincipal + "[label=\"" + this.type.toString() + "\"];\n        " + cant.rama + "\n        " + nombreNodoPrincipal + " -> tipodato" + nombreNodoPrincipal + " -> tipodatoval" + nombreNodoPrincipal + ";\n        " + nombreNodoPrincipal + " -> " + cant.nodo + ";\n        ";
        return { rama: rama, nodo: nombreNodoPrincipal.toString() };
    };
    return NewCleanArray;
}(Expresiones_1.Expression));
exports.NewCleanArray = NewCleanArray;
