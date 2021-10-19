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
exports.AccesArray = void 0;
var Expresiones_1 = require("../Abstract/Expresiones");
var Retorno_1 = require("../Abstract/Retorno");
var Error_1 = require("../Errores/Error");
var AccesArray = /** @class */ (function (_super) {
    __extends(AccesArray, _super);
    function AccesArray(anterior, index, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.anterior = anterior;
        _this.index = index;
        return _this;
    }
    AccesArray.prototype.execute = function (environment) {
        var anterior = environment.getVar(this.anterior);
        if (anterior != null || anterior != undefined) {
            if (anterior.type != Retorno_1.Type.ARRAY) {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES UN ARREGLO");
            }
            else {
                var index = this.index.execute(environment);
                if (index != null || index != undefined) {
                    if (index.type != Retorno_1.Type.INT) {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL INDICE NO ES UN NUMERO");
                    }
                    else {
                        var valoractual = anterior.valor.getValue(index.value);
                        return { value: valoractual.valor, type: valoractual.type };
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO HA ENVIADO EL INDICE CORRECTAMENTE");
                }
            }
        }
        else {
            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE HA DECLARADO EL ARREGLO");
        }
    };
    return AccesArray;
}(Expresiones_1.Expression));
exports.AccesArray = AccesArray;
