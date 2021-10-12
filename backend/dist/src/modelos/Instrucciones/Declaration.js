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
exports.Declaration = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Error_1 = require("../Errores/Error");
var Retorno_1 = require("../Abstract/Retorno");
var Declaration = /** @class */ (function (_super) {
    __extends(Declaration, _super);
    function Declaration(type, asignacion, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.type = type;
        _this.asignacion = asignacion;
        return _this;
    }
    Declaration.prototype.execute = function (environment) {
        if (this.type != Retorno_1.Type.NULL) {
            var tipo = this.asignacion.getType(environment);
            if (tipo == this.type) {
                this.asignacion.execute(environment);
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE DECLARAR LA VARIABLE PORQUE EL TIPO DE LA EXPRESION ASIGNADA NO COINCIDE CON EL TIPO DE LA DECLARACION");
            }
        }
    };
    return Declaration;
}(Instrucciones_1.Instruction));
exports.Declaration = Declaration;
