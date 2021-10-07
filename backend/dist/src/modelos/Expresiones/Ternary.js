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
exports.Ternary = void 0;
var Expresiones_1 = require("../Abstract/Expresiones");
var Retorno_1 = require("../Abstract/Retorno");
var Error_1 = require("../Errores/Error");
var Ternary = /** @class */ (function (_super) {
    __extends(Ternary, _super);
    function Ternary(condicion, retorno, retorno2, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condicion = condicion;
        _this.retorno = retorno;
        _this.retorno2 = retorno2;
        return _this;
    }
    Ternary.prototype.execute = function (environment) {
        var condition = this.condicion.execute(environment);
        if (condition.type == Retorno_1.Type.BOOLEAN) {
            if (condition.value == true) {
                var return1 = this.retorno.execute(environment);
                return return1;
            }
            else if (condition.value == false) {
                var return2 = this.retorno2.execute(environment);
                return return2;
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE PUEDE REALIZAR LA OPERACION TERNARIA SI LA PRIMERA EXPRESION NO DEVUELVE UN BOOLEAN");
            }
        }
        else {
            return { value: null, type: Retorno_1.Type.NULL };
        }
    };
    return Ternary;
}(Expresiones_1.Expression));
exports.Ternary = Ternary;
