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
exports.ArithmeticAccess = exports.ArithmeticAccessOption = void 0;
var Error_1 = require("../Errores/Error");
var Expresiones_1 = require("../Abstract/Expresiones");
var Retorno_1 = require("../Abstract/Retorno");
var ArithmeticAccessOption;
(function (ArithmeticAccessOption) {
    ArithmeticAccessOption[ArithmeticAccessOption["MENOS_MENOS"] = 0] = "MENOS_MENOS";
    ArithmeticAccessOption[ArithmeticAccessOption["MAS_MAS"] = 1] = "MAS_MAS";
})(ArithmeticAccessOption = exports.ArithmeticAccessOption || (exports.ArithmeticAccessOption = {}));
var ArithmeticAccess = /** @class */ (function (_super) {
    __extends(ArithmeticAccess, _super);
    function ArithmeticAccess(id, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.type = type;
        return _this;
    }
    ArithmeticAccess.prototype.execute = function (environment) {
        var value = environment.getVar(this.id);
        if (value == null) {
            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA VARIABLE NO EXISTE");
        }
        else {
            if (value.type == Retorno_1.Type.INT) {
                if (this.type == ArithmeticAccessOption.MAS_MAS) {
                    var val = value.valor + 1;
                    return { value: val, type: value.type };
                }
                else {
                    var val = value.valor - 1;
                    return { value: val, type: value.type };
                }
            }
            {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL VALOR DE LA VARIABLE NO ES DE TIPO ENTERO");
            }
        }
    };
    return ArithmeticAccess;
}(Expresiones_1.Expression));
exports.ArithmeticAccess = ArithmeticAccess;
