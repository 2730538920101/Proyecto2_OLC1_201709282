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
exports.CallExp = exports.TypeCallExp = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Enviorment_1 = require("../Symbol/Enviorment");
var Error_1 = require("../Errores/Error");
var Retorno_1 = require("../Abstract/Retorno");
var TypeCallExp;
(function (TypeCallExp) {
    TypeCallExp[TypeCallExp["GETVALUE"] = 0] = "GETVALUE";
    TypeCallExp[TypeCallExp["TOLOWER"] = 1] = "TOLOWER";
    TypeCallExp[TypeCallExp["TOUPPER"] = 2] = "TOUPPER";
    TypeCallExp[TypeCallExp["LENGTH"] = 3] = "LENGTH";
    TypeCallExp[TypeCallExp["TRUNCATE"] = 4] = "TRUNCATE";
    TypeCallExp[TypeCallExp["ROUND"] = 5] = "ROUND";
    TypeCallExp[TypeCallExp["TOSTRING"] = 6] = "TOSTRING";
    TypeCallExp[TypeCallExp["TOCHARARRAY"] = 7] = "TOCHARARRAY";
    TypeCallExp[TypeCallExp["TYPEOF"] = 8] = "TYPEOF";
    TypeCallExp[TypeCallExp["DECLARED"] = 9] = "DECLARED";
})(TypeCallExp = exports.TypeCallExp || (exports.TypeCallExp = {}));
var CallExp = /** @class */ (function (_super) {
    __extends(CallExp, _super);
    function CallExp(id, expresiones, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.expresiones = expresiones;
        _this.type = type;
        return _this;
    }
    CallExp.prototype.execute = function (environment) {
        switch (this.type) {
            case TypeCallExp.DECLARED:
                var func = environment.getFuncion(this.id);
                if (func != undefined || func != null) {
                    var newEnv = new Enviorment_1.Environment(environment.getGlobal());
                    if (this.expresiones.length == func.parametros.length) {
                        for (var i = 0; i < this.expresiones.length; i++) {
                            var value_1 = this.expresiones[i].execute(environment);
                            var param = func.parametros[i].execute(environment);
                            if (value_1.type == param.type) {
                                newEnv.guardar(param.value, value_1.value, value_1.type);
                            }
                            else {
                                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LOS PARAMETROS INGRESADOS EN LA LLAMADA NO SON DEL MISMO TIPO QUE EN LA DECLARACION");
                            }
                        }
                        var value = func.statment.execute(newEnv);
                        if (value != undefined) {
                            return value.value;
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO ESTA RETORNANDO EL VALOR");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO TIENE LA MISMA CANTIDAD DE PARAMETROS INGRESADOS");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                }
            case TypeCallExp.LENGTH:
                var lengthval = this.expresiones[0].execute(environment);
                if (this.expresiones.length == 1) {
                    if (lengthval.type == Retorno_1.Type.ARRAY || lengthval.type == Retorno_1.Type.LIST || lengthval.type == Retorno_1.Type.STRING) {
                        return { value: lengthval.value.toString().length, type: Retorno_1.Type.INT };
                    }
                    else if (lengthval.type == Retorno_1.Type.RETURN) {
                        if (lengthval.value.type == Retorno_1.Type.ARRAY || lengthval.value.type == Retorno_1.Type.LIST || lengthval.value.type == Retorno_1.Type.STRING) {
                            return { value: lengthval.value.value.toString().length, type: Retorno_1.Type.INT };
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING, DYNAMIC LIST O ARRAY");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING, DYNAMIC LIST O ARRAY");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.ROUND:
                var roundval = this.expresiones[0].execute(environment);
                if (this.expresiones.length == 1) {
                    if (roundval.type == Retorno_1.Type.DOUBLE) {
                        return { value: Math.round(roundval.value), type: Retorno_1.Type.INT };
                    }
                    else if (roundval.type == Retorno_1.Type.RETURN) {
                        if (roundval.value.type == Retorno_1.Type.DOUBLE) {
                            return { value: Math.round(roundval.value.value), type: Retorno_1.Type.INT };
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION ROUND SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION ROUND SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION ROUND SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOCHARARRAY:
                var tochararrayval = this.expresiones[0].execute(environment);
                if (this.expresiones.length == 1) {
                    if (tochararrayval.type == Retorno_1.Type.STRING) {
                        return { value: tochararrayval.value.split(''), type: Retorno_1.Type.CHAR };
                    }
                    else if (tochararrayval.type == Retorno_1.Type.RETURN) {
                        if (tochararrayval.value.type == Retorno_1.Type.STRING) {
                            return { value: tochararrayval.value.value.split(''), type: Retorno_1.Type.CHAR };
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOCHARARRAY SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOCHARARRAY SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOCHARARRAY SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOLOWER:
                var tolowerval = this.expresiones[0].execute(environment);
                if (this.expresiones.length == 1) {
                    if (tolowerval.type == Retorno_1.Type.STRING) {
                        return { value: tolowerval.value.toLowerCase(), type: Retorno_1.Type.STRING };
                    }
                    else if (tolowerval.type == Retorno_1.Type.RETURN) {
                        if (tolowerval.value.type == Retorno_1.Type.STRING) {
                            return { value: tolowerval.value.value.toLowerCase(), type: Retorno_1.Type.STRING };
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOLOWER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOLOWER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOLOWER SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOUPPER:
                var toupperval = this.expresiones[0].execute(environment);
                if (this.expresiones.length == 1) {
                    if (toupperval.type == Retorno_1.Type.STRING) {
                        return { value: toupperval.value.toUpperCase(), type: Retorno_1.Type.STRING };
                    }
                    else if (toupperval.type == Retorno_1.Type.RETURN) {
                        if (toupperval.value.type == Retorno_1.Type.STRING) {
                            return { value: toupperval.value.value.toUpperCase(), type: Retorno_1.Type.STRING };
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOUPPER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOUPPER SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOUPPER SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TOSTRING:
                var tostringval = this.expresiones[0].execute(environment);
                if (this.expresiones.length == 1) {
                    if (tostringval.type == Retorno_1.Type.INT || tostringval.type == Retorno_1.Type.DOUBLE) {
                        return { value: tostringval.value.toString(), type: Retorno_1.Type.STRING };
                    }
                    else if (tostringval.type == Retorno_1.Type.RETURN) {
                        if (tostringval.value.type == Retorno_1.Type.INT || tostringval.value.type == Retorno_1.Type.DOUBLE) {
                            return { value: tostringval.value.value.toString(), type: Retorno_1.Type.STRING };
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOSTRING SOLO PUEDE RECIBIR PARAMETROS DE TIPO INT O DOUBLE");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOSTRING SOLO PUEDE RECIBIR PARAMETROS DE TIPO INT O DOUBLE");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TOSTRING SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TRUNCATE:
                var truncateval = this.expresiones[0].execute(environment);
                if (this.expresiones.length == 1) {
                    if (truncateval.type == Retorno_1.Type.DOUBLE) {
                        return { value: Math.trunc(truncateval.value), type: Retorno_1.Type.INT };
                    }
                    else if (truncateval.type == Retorno_1.Type.RETURN) {
                        if (truncateval.value.type == Retorno_1.Type.DOUBLE) {
                            return { value: Math.trunc(truncateval.value.value), type: Retorno_1.Type.INT };
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TRUNCATE SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TRUNCATE SOLO PUEDE RECIBIR PARAMETROS DE TIPO DOUBLE");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TRUNCATE SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.TYPEOF:
                var typeofval = this.expresiones[0].execute(environment);
                if (this.expresiones.length == 1) {
                    if (typeofval.type != Retorno_1.Type.RETURN) {
                        return { value: typeofval.type.toString(), type: Retorno_1.Type.STRING };
                    }
                    else {
                        return { value: typeofval.value.type.toString(), type: Retorno_1.Type.STRING };
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION TYPEOF SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCallExp.GETVALUE:
        }
    };
    return CallExp;
}(Instrucciones_1.Instruction));
exports.CallExp = CallExp;
