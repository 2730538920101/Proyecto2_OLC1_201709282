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
                if (this.column <= 1) {
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
                    console.log(imprimir);
                    break;
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA FUNCION WRITELINE SOLO PUEDE RECIBIR UN PARAMETRO");
                }
            case TypeCall.SETVALUE:
            case TypeCall.APPEND:
        }
    };
    return Call;
}(Instrucciones_1.Instruction));
exports.Call = Call;
