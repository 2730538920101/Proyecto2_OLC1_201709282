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
exports.AccessArrayAssigment = void 0;
var Retorno_1 = require("../Abstract/Retorno");
var Error_1 = require("../Errores/Error");
var Instrucciones_1 = require("../Abstract/Instrucciones");
var AccessArrayAssigment = /** @class */ (function (_super) {
    __extends(AccessArrayAssigment, _super);
    function AccessArrayAssigment(anterior, index, value, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.anterior = anterior;
        _this.index = index;
        _this.value = value;
        return _this;
    }
    AccessArrayAssigment.prototype.execute = function (environment) {
        for (var i = 0; i < this.anterior.length; i++) {
            var anterior = this.anterior[i].execute(environment);
            if (anterior) {
                if (anterior.type != Retorno_1.Type.ARRAY) {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES UN ARREGLO");
                }
                else {
                    var index = this.index.execute(environment);
                    if (index.type != Retorno_1.Type.INT) {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL INDICE NO ES UN NUMERO");
                    }
                    else {
                        var valor = this.value.execute(environment);
                        if (valor.type == anterior.type) {
                            anterior.value.setValue(index.value, valor.value);
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL VALOR QUE DESEA ALMACENAR NO ES DEL TIPO DEL QUE LA VARIABLE FUE DECLARADA");
                        }
                    }
                }
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
            }
        }
    };
    return AccessArrayAssigment;
}(Instrucciones_1.Instruction));
exports.AccessArrayAssigment = AccessArrayAssigment;
