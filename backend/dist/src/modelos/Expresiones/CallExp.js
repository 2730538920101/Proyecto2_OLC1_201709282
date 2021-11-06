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
var Symbol_1 = require("../Symbol/Symbol");
var List_1 = require("../Symbol/List");
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
                    if (lengthval.type == Retorno_1.Type.STRING) {
                        return { value: lengthval.value.toString().length, type: Retorno_1.Type.INT };
                    }
                    else if (lengthval.type == Retorno_1.Type.RETURN) {
                        if (lengthval.value.type == Retorno_1.Type.STRING) {
                            return { value: lengthval.value.value.toString().length, type: Retorno_1.Type.INT };
                        }
                        else if (lengthval.value.type == Retorno_1.Type.LIST) {
                            return { value: lengthval.value.value.values.length, type: Retorno_1.Type.INT };
                        }
                        else if (lengthval.value.type == Retorno_1.Type.ARRAY) {
                            return { value: lengthval.value.value.values.length, type: Retorno_1.Type.INT };
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION LENGTH SOLO PUEDE RECIBIR PARAMETROS DE TIPO STRING, DYNAMIC LIST O ARRAY");
                        }
                    }
                    else if (lengthval.type == Retorno_1.Type.LIST) {
                        return { value: lengthval.value.values.length, type: Retorno_1.Type.INT };
                    }
                    else if (lengthval.type == Retorno_1.Type.ARRAY) {
                        return { value: lengthval.value.values.length, type: Retorno_1.Type.INT };
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
                        var arr = tochararrayval.value.split('');
                        var val = [];
                        for (var i = 0; i < arr.length; i++) {
                            var sim = new Symbol_1.Symbol(arr[i], '', Retorno_1.Type.CHAR);
                            val.push(sim);
                        }
                        var li = new List_1.List(Retorno_1.Type.CHAR);
                        li.setValues(val);
                        return { value: li, type: Retorno_1.Type.LIST };
                    }
                    else if (tochararrayval.type == Retorno_1.Type.RETURN) {
                        if (tochararrayval.value.type == Retorno_1.Type.STRING) {
                            var arr = tochararrayval.value.split('');
                            var val = [];
                            for (var i = 0; i < arr.length; i++) {
                                var sim = new Symbol_1.Symbol(arr[i], '', Retorno_1.Type.CHAR);
                                val.push(sim);
                            }
                            var li = new List_1.List(Retorno_1.Type.CHAR);
                            li.setValues(val);
                            return { value: li, type: Retorno_1.Type.LIST };
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
                var variable = environment.getVar(this.id);
                if ((variable === null || variable === void 0 ? void 0 : variable.type) == Retorno_1.Type.LIST) {
                    var indice = this.expresiones[0].execute(environment);
                    if (indice.type == Retorno_1.Type.INT) {
                        var seleccionado = variable.valor.getValue(indice.value);
                        return { value: seleccionado.valor, type: seleccionado.type };
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL SEGUNDO PARAMETRO QUE RECIBE LA FUNCION GETVALUE DEBE SER UN ENTERO");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL PRIMER PARAMETRO QUE RECIBE LA FUNCION GETVALUE DEBE SER UNA VARIABLE DE TIPO DYNAMIC LIST");
                }
        }
    };
    CallExp.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoCallExp" + x.toString();
        switch (this.type) {
            case TypeCallExp.GETVALUE:
                var expExp = this.expresiones[0].draw();
                var rama1 = "\n                " + nombreNodoPrincipal + "[label=\"GETVALUE\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"getValue\"];\n                nodoparam" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoparamval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> nodoparam" + nombreNodoPrincipal + " -> nodoparamval" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp.nodo + ";\n                ";
                return { rama: rama1, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.TOLOWER:
                var expExp2 = this.expresiones[0].draw();
                var rama2 = "\n                " + nombreNodoPrincipal + "[label=\"TOLOWER\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp2.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp2.nodo + ";\n                ";
                return { rama: rama2, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.TOUPPER:
                var expExp3 = this.expresiones[0].draw();
                var rama3 = "\n                " + nombreNodoPrincipal + "[label=\"TOUPPER\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp3.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp3.nodo + ";\n                ";
                return { rama: rama3, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.LENGTH:
                var expExp4 = this.expresiones[0].draw();
                var rama4 = "\n                " + nombreNodoPrincipal + "[label=\"LENGTH\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp4.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp4.nodo + ";\n                ";
                return { rama: rama4, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.TRUNCATE:
                var expExp5 = this.expresiones[0].draw();
                var rama5 = "\n                " + nombreNodoPrincipal + "[label=\"TRUNCATE\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp5.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp5.nodo + ";\n                ";
                return { rama: rama5, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.ROUND:
                var expExp6 = this.expresiones[0].draw();
                var rama6 = "\n                " + nombreNodoPrincipal + "[label=\"ROUND\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp6.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp6.nodo + ";\n                ";
                return { rama: rama6, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.TOSTRING:
                var expExp7 = this.expresiones[0].draw();
                var rama7 = "\n                " + nombreNodoPrincipal + "[label=\"TOSTRING\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp7.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp7.nodo + ";\n                ";
                return { rama: rama7, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.TOCHARARRAY:
                var expExp8 = this.expresiones[0].draw();
                var rama8 = "\n                " + nombreNodoPrincipal + "[label=\"TOCHARARRAY\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp8.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp8.nodo + ";\n                ";
                return { rama: rama8, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.TYPEOF:
                var expExp9 = this.expresiones[0].draw();
                var rama9 = "\n                " + nombreNodoPrincipal + "[label=\"TYPEOF\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp9.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp9.nodo + ";\n                ";
                return { rama: rama9, nodo: nombreNodoPrincipal.toString() };
            case TypeCallExp.DECLARED:
                var params2 = "";
                for (var i = 0; i < this.expresiones.length; i++) {
                    var actual = this.expresiones[i].draw();
                    params2 = params2 + ("\n                    nodoparam" + nombreNodoPrincipal + i + "[label=\"PARAMETRO\"];\n                    " + actual.rama + "\n                    " + nombreNodoPrincipal + " -> nodoparam" + nombreNodoPrincipal + i + " -> " + actual.nodo + ";\n                    ");
                }
                var rama10 = "\n                " + nombreNodoPrincipal + "[label=\"DECLARED\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoidval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + params2 + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n                ";
                return { rama: rama10, nodo: nombreNodoPrincipal.toString() };
        }
    };
    return CallExp;
}(Instrucciones_1.Instruction));
exports.CallExp = CallExp;
