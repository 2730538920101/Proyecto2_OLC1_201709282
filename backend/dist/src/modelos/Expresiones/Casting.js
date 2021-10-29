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
exports.Casting = void 0;
var Retorno_1 = require("../Abstract/Retorno");
var Expresiones_1 = require("../Abstract/Expresiones");
var Error_1 = require("../Errores/Error");
var Casting = /** @class */ (function (_super) {
    __extends(Casting, _super);
    function Casting(changeTo, value, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.changeTo = changeTo;
        _this.value = value;
        return _this;
    }
    Casting.prototype.execute = function (environment) {
        var exptype = this.value.execute(environment).type;
        switch (this.changeTo) {
            case Retorno_1.Type.INT:
                if (exptype == Retorno_1.Type.DOUBLE) {
                    var val = this.value.execute(environment).value;
                    return { value: parseInt(val, 10), type: Retorno_1.Type.INT };
                }
                else if (exptype == Retorno_1.Type.CHAR) {
                    var val = this.value.execute(environment).value;
                    return { value: val, type: Retorno_1.Type.INT };
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO " + exptype + " AL TIPO " + this.changeTo);
                }
            case Retorno_1.Type.DOUBLE:
                if (exptype == Retorno_1.Type.INT) {
                    var val = this.value.execute(environment).value;
                    return { value: parseFloat(val.toString()).toFixed(2), type: Retorno_1.Type.DOUBLE };
                }
                else if (exptype == Retorno_1.Type.CHAR) {
                    var val = this.value.execute(environment).value;
                    return { value: parseFloat(val.toString()).toFixed(2), type: Retorno_1.Type.DOUBLE };
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO " + exptype + " AL TIPO " + this.changeTo);
                }
            case Retorno_1.Type.CHAR:
                if (exptype == Retorno_1.Type.INT) {
                    var val = this.value.execute(environment).value;
                    return { value: String.fromCharCode(val), type: Retorno_1.Type.CHAR };
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO " + exptype + " AL TIPO " + this.changeTo);
                }
            default:
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE PUEDE REALIZAR EL CASTING DEL TIPO " + this.changeTo);
        }
    };
    Casting.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoCasting" + x.toString();
        var valor = this.value.draw();
        var rama = "\n        " + nombreNodoPrincipal + "[label=\"CASTING\"];\n        tipodato" + nombreNodoPrincipal + "[label=\"TIPO DE DATO\"];\n        tipodatoval" + nombreNodoPrincipal + "[label=\"" + this.changeTo.toString() + "\"];\n        " + valor.rama + "\n        " + nombreNodoPrincipal + " -> tipodato" + nombreNodoPrincipal + " -> tipodatoval" + nombreNodoPrincipal + ";\n        " + nombreNodoPrincipal + " -> " + valor.nodo + ";\n        ";
        return { rama: rama, nodo: nombreNodoPrincipal.toString() };
    };
    return Casting;
}(Expresiones_1.Expression));
exports.Casting = Casting;
