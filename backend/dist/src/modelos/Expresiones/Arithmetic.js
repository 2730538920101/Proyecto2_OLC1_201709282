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
exports.Arithmetic = exports.ArithmeticOption = void 0;
var Expresiones_1 = require("../Abstract/Expresiones");
var Retorno_1 = require("../Abstract/Retorno");
var Error_1 = require("../Errores/Error");
var ArithmeticOption;
(function (ArithmeticOption) {
    ArithmeticOption[ArithmeticOption["SUMA"] = 0] = "SUMA";
    ArithmeticOption[ArithmeticOption["RESTA"] = 1] = "RESTA";
    ArithmeticOption[ArithmeticOption["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    ArithmeticOption[ArithmeticOption["DIVISION"] = 3] = "DIVISION";
    ArithmeticOption[ArithmeticOption["POTENCIA"] = 4] = "POTENCIA";
    ArithmeticOption[ArithmeticOption["MODULO"] = 5] = "MODULO";
    ArithmeticOption[ArithmeticOption["UNARIO"] = 6] = "UNARIO";
})(ArithmeticOption = exports.ArithmeticOption || (exports.ArithmeticOption = {}));
var Arithmetic = /** @class */ (function (_super) {
    __extends(Arithmetic, _super);
    function Arithmetic(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Arithmetic.prototype.execute = function (environment) {
        var leftValue = this.left.execute(environment);
        var rightValue = this.right.execute(environment);
        var result = { value: null, type: Retorno_1.Type.NULL };
        if (this.type == ArithmeticOption.SUMA) {
            var dominanteSuma = this.DominanteSuma(leftValue.type, rightValue.type);
            if (dominanteSuma == Retorno_1.Type.STRING) {
                result = { value: (leftValue.value.toString() + rightValue.value.toString()), type: Retorno_1.Type.STRING };
            }
            else if (dominanteSuma == Retorno_1.Type.INT) {
                result = { value: (leftValue.value + rightValue.value), type: Retorno_1.Type.INT };
            }
            else if (dominanteSuma == Retorno_1.Type.DOUBLE) {
                result = { value: (leftValue.value + rightValue.value), type: Retorno_1.Type.DOUBLE };
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES POSIBLE SUMAR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }
        else if (this.type == ArithmeticOption.RESTA) {
            var dominanteResta = this.DominanteResta(leftValue.type, rightValue.type);
            if (dominanteResta == Retorno_1.Type.INT) {
                result = { value: (leftValue.value - rightValue.value), type: Retorno_1.Type.INT };
            }
            else if (dominanteResta == Retorno_1.Type.DOUBLE) {
                result = { value: (leftValue.value - rightValue.value), type: Retorno_1.Type.DOUBLE };
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES POSIBLE RESTAR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }
        else if (this.type == ArithmeticOption.MULTIPLICACION) {
            var dominanteMultiplicacion = this.DominanteMultiplicacion(leftValue.type, rightValue.type);
            if (dominanteMultiplicacion == Retorno_1.Type.INT) {
                result = { value: (leftValue.value * rightValue.value), type: Retorno_1.Type.INT };
            }
            else if (dominanteMultiplicacion == Retorno_1.Type.DOUBLE) {
                result = { value: (leftValue.value * rightValue.value), type: Retorno_1.Type.DOUBLE };
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES POSIBLE MULTIPLICAR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }
        else if (this.type == ArithmeticOption.DIVISION) {
            var dominanteDivision = this.DominanteDivision(leftValue.type, rightValue.type);
            if (rightValue.value == 0) {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES POSIBLE DIVIDIR UN NUMERO ENTRE 0");
            }
            else {
                if (dominanteDivision == Retorno_1.Type.INT) {
                    result = { value: (leftValue.value / rightValue.value), type: Retorno_1.Type.INT };
                }
                else if (dominanteDivision == Retorno_1.Type.DOUBLE) {
                    result = { value: (leftValue.value / rightValue.value), type: Retorno_1.Type.DOUBLE };
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES POSIBLE DIVIDIR VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
                }
            }
        }
        else if (this.type == ArithmeticOption.POTENCIA) {
            var dominantePotencia = this.DominantePotencia(leftValue.type, rightValue.type);
            if (dominantePotencia == Retorno_1.Type.INT) {
                result = { value: (Math.pow(leftValue.value, rightValue.value)), type: Retorno_1.Type.INT };
            }
            else if (dominantePotencia == Retorno_1.Type.DOUBLE) {
                result = { value: (Math.pow(leftValue.value, rightValue.value)), type: Retorno_1.Type.DOUBLE };
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES POSIBLE ELEVAR A LA POTENCIA LOS VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }
        else if (this.type == ArithmeticOption.MODULO) {
            var dominanteModulo = this.DominanteModulo(leftValue.type, rightValue.type);
            if (dominanteModulo == Retorno_1.Type.INT) {
                result = { value: (leftValue.value % rightValue.value), type: Retorno_1.Type.INT };
            }
            else if (dominanteModulo == Retorno_1.Type.DOUBLE) {
                result = { value: (leftValue.value % rightValue.value), type: Retorno_1.Type.DOUBLE };
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES POSIBLE CALCULAR EL MODULO DE VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }
        else if (this.type == ArithmeticOption.UNARIO) {
            var dominanteUnario = this.DominanteUnario(rightValue.type);
            if (dominanteUnario == Retorno_1.Type.INT) {
                result = { value: (leftValue.value - rightValue.value), type: Retorno_1.Type.INT };
            }
            else if (dominanteUnario == Retorno_1.Type.DOUBLE) {
                result = { value: (leftValue.value - rightValue.value), type: Retorno_1.Type.DOUBLE };
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES POSIBLE REALIZAR LA OPERACION UNARIA DE VALORES DE TIPO: " + leftValue.type + " y " + rightValue.type);
            }
        }
        return result;
    };
    return Arithmetic;
}(Expresiones_1.Expression));
exports.Arithmetic = Arithmetic;
