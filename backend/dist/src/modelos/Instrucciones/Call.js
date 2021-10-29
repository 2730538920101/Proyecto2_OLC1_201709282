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
exports.Call = exports.TypeCall = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Enviorment_1 = require("../Symbol/Enviorment");
var Error_1 = require("../Errores/Error");
var Symbol_1 = require("../Symbol/Symbol");
var Impresiones_1 = require("../Reportes/Impresiones");
var TypeCall;
(function (TypeCall) {
    TypeCall[TypeCall["DECLARED"] = 0] = "DECLARED";
    TypeCall[TypeCall["SETVALUE"] = 1] = "SETVALUE";
    TypeCall[TypeCall["WRITELINE"] = 2] = "WRITELINE";
    TypeCall[TypeCall["APPEND"] = 3] = "APPEND";
    TypeCall[TypeCall["START"] = 4] = "START";
})(TypeCall = exports.TypeCall || (exports.TypeCall = {}));
var Call = /** @class */ (function (_super) {
    __extends(Call, _super);
    function Call(id, expresiones, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.expresiones = expresiones;
        _this.type = type;
        _this.contadorstart = 0;
        return _this;
    }
    Call.prototype.execute = function (environment) {
        switch (this.type) {
            case TypeCall.START:
                this.contadorstart++;
                if (this.contadorstart <= 1) {
                    var start = environment.getFuncion(this.id);
                    if (start != undefined || start != null) {
                        var newEnv = new Enviorment_1.Environment(environment.getGlobal());
                        if (start.parametros.length == this.expresiones.length) {
                            for (var i = 0; i < this.expresiones.length; i++) {
                                var value = this.expresiones[i].execute(environment);
                                var param = start.parametros[i].execute(environment);
                                if (value.type == param.type) {
                                    newEnv.guardar(param.value, value.value, value.type);
                                }
                                else {
                                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LOS PARAMETROS INGRESADOS EN LA LLAMADA NO SON DEL MISMO TIPO QUE EN LA DECLARACION");
                                }
                            }
                            start.statment.execute(newEnv);
                            break;
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION NO TIENE EL MISMO NUMERO DE PARAMETROS QUE LOS DATOS INGRESADOS");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION START SOLO SE PUEDE EJECUTAR UNA VEZ");
                }
            case TypeCall.DECLARED:
                var func = environment.getFuncion(this.id);
                if (func != undefined || func != null) {
                    var newEnv = new Enviorment_1.Environment(environment.getGlobal());
                    if (func.parametros.length == this.expresiones.length) {
                        for (var i = 0; i < this.expresiones.length; i++) {
                            var value = this.expresiones[i].execute(environment);
                            var param = func.parametros[i].execute(environment);
                            if (value.type == param.type) {
                                newEnv.guardar(param.value, value.value, value.type);
                            }
                            else {
                                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LOS PARAMETROS INGRESADOS EN LA LLAMADA NO SON DEL MISMO TIPO QUE EN LA DECLARACION");
                            }
                        }
                        func.statment.execute(newEnv);
                        break;
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION NO TIENE EL MISMO NUMERO DE PARAMETROS QUE LOS DATOS INGRESADOS");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION QUE ESTA LLAMANDO NO HA SIDO DECLARADA");
                }
            case TypeCall.WRITELINE:
                var imprimir = this.expresiones[0].execute(environment).value;
                if (this.expresiones.length == 1) {
                    Impresiones_1.prints.push(imprimir.toString());
                    console.log(imprimir);
                    break;
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION WRITELINE SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCall.SETVALUE:
                var variable = environment.getVar(this.id);
                if (variable) {
                    if (this.expresiones.length == 2) {
                        var indice = this.expresiones[0].execute(environment).value;
                        var elegido = variable.valor;
                        if (elegido.type == this.expresiones[1].execute(environment).type) {
                            var simb = new Symbol_1.Symbol(this.expresiones[1].execute(environment).value, this.id, elegido.type);
                            elegido.setValue(indice, simb);
                            break;
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL VALOR QUE DESEA INGRESAR NO ES DEL MISMO TIPO QUE LA LISTA");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION SETVALUE RECIBE COMO SEGUNDO PARAMETRO UN INDICE Y COMO TERCER PARAMETRO UN VALOR");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION SETVALUE DEBE RECIBIR EL NOMBRE DE UNA VARIABLE COMO PRIMER PARAMETRO");
                }
            case TypeCall.APPEND:
                var variable2 = environment.getVar(this.id);
                if (variable2) {
                    if (this.expresiones.length == 1) {
                        var valadd = this.expresiones[0].execute(environment);
                        var varadd = variable2.valor;
                        if (valadd != null || valadd != undefined) {
                            if (varadd.type == valadd.type) {
                                var sim = new Symbol_1.Symbol(this.expresiones[0].execute(environment).value, this.id, valadd.type);
                                varadd.append(sim);
                                break;
                            }
                            else {
                                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL VALOR QUE DESEA INGRESAR NO ES DEL TIPO DE LA LISTA");
                            }
                        }
                        else {
                            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA LISTA NO HA SIDO DECLARADA");
                        }
                    }
                    else {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION APPEND SOLO PUEDE RECIBIR UN VALOR COMO SEGUNDO PARAMETRO");
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION APPEND DEBE RECIBIR EL NOMBRE DE UNA VARIABLE COMO PRIMER PARAMETRO");
                }
        }
    };
    Call.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoCall" + x.toString();
        switch (this.type) {
            case TypeCall.START:
                var params = "";
                for (var i = 0; i < this.expresiones.length; i++) {
                    var actual = this.expresiones[i].draw();
                    params = params + ("\n                    nodoparam" + nombreNodoPrincipal + i + "[label=\"PARAMETRO\"];\n                    " + actual.rama + "\n                    " + nombreNodoPrincipal + " -> nodoparam" + nombreNodoPrincipal + i + " -> " + actual.nodo + ";\n                    ");
                }
                var rama = "\n                " + nombreNodoPrincipal + "[label=\"START WITH\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoidval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + params + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n                ";
                return { rama: rama, nodo: nombreNodoPrincipal.toString() };
            case TypeCall.DECLARED:
                var params2 = "";
                for (var i = 0; i < this.expresiones.length; i++) {
                    var actual = this.expresiones[i].draw();
                    params2 = params2 + ("\n                    nodoparam" + nombreNodoPrincipal + i + "[label=\"PARAMETRO\"];\n                    " + actual.rama + "\n                    " + nombreNodoPrincipal + " -> nodoparam" + nombreNodoPrincipal + i + " -> " + actual.nodo + ";\n                    ");
                }
                var rama2 = "\n                " + nombreNodoPrincipal + "[label=\"DECLARED\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoidval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + params2 + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n                ";
                return { rama: rama2, nodo: nombreNodoPrincipal.toString() };
            case TypeCall.WRITELINE:
                var expExp = this.expresiones[0].draw();
                var rama3 = "\n                " + nombreNodoPrincipal + "[label=\"WRITELINE\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoidval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + expExp.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + expExp.nodo + ";\n                ";
                return { rama: rama3, nodo: nombreNodoPrincipal.toString() };
            case TypeCall.SETVALUE:
                var pos = this.expresiones[0].draw();
                var val = this.expresiones[1].draw();
                var rama4 = "\n                " + nombreNodoPrincipal + "[label=\"SETVALUE\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoidval" + nombreNodoPrincipal + "[label=\"setValue\"];\n                nodoidlist" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoidlistval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + pos.rama + "\n                " + val.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> nodoidlist" + nombreNodoPrincipal + " -> nodoidlistval" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + pos.nodo + ";\n                " + nombreNodoPrincipal + " -> " + val.nodo + ";\n                ";
                return { rama: rama4, nodo: nombreNodoPrincipal.toString() };
            case TypeCall.APPEND:
                var val2 = this.expresiones[0].draw();
                var rama5 = "\n                " + nombreNodoPrincipal + "[label=\"APPEND\"];\n                nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoidval" + nombreNodoPrincipal + "[label=\"append\"];\n                nodoidlist" + nombreNodoPrincipal + "[label=\"ID\"];\n                nodoidlistval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n                " + val2.rama + "\n                " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> nodoidlist" + nombreNodoPrincipal + " -> nodoidlistval" + nombreNodoPrincipal + ";\n                " + nombreNodoPrincipal + " -> " + val2.nodo + ";\n                ";
                return { rama: rama5, nodo: nombreNodoPrincipal.toString() };
        }
    };
    return Call;
}(Instrucciones_1.Instruction));
exports.Call = Call;
