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
exports.For = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Retorno_1 = require("../Abstract/Retorno");
var Error_1 = require("../Errores/Error");
var For = /** @class */ (function (_super) {
    __extends(For, _super);
    function For(asignacion, condicion, incremento, code, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.asignacion = asignacion;
        _this.condicion = condicion;
        _this.incremento = incremento;
        _this.code = code;
        return _this;
    }
    For.prototype.execute = function (environment) {
        this.asignacion.execute(environment);
        var cond = this.condicion.execute(environment);
        if (cond.type == Retorno_1.Type.BOOLEAN) {
            while (cond.value == true) {
                var element = this.code.execute(environment);
                if (element != null || element != undefined) {
                    if (element.type == Retorno_1.Type.BREAK) {
                        break;
                    }
                    else if (element.type == Retorno_1.Type.CONTINUE) {
                        cond = this.condicion.execute(environment);
                        continue;
                    }
                    else {
                        return element;
                    }
                }
                this.incremento.execute(environment);
                cond = this.condicion.execute(environment);
                if (cond.type != Retorno_1.Type.BOOLEAN) {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA EXPRESION RECIBIDA NO ES DE TIPO BOOLEAN");
                }
            }
        }
        else {
            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA CONDICION DEBE RETORNAR UN VALOR DE TIPO BOOLEANO");
        }
    };
    return For;
}(Instrucciones_1.Instruction));
exports.For = For;
