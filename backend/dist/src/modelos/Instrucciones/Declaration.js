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
var Declaration = /** @class */ (function (_super) {
    __extends(Declaration, _super);
    function Declaration(type, asignacion, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.type = type;
        _this.asignacion = asignacion;
        return _this;
    }
    Declaration.prototype.execute = function (environment) {
        try {
            var tipo = this.asignacion.getType(environment);
            var id = this.asignacion.getId();
            if (tipo == this.type) {
                environment.guardar(id, null, this.type);
                this.asignacion.execute(environment);
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE PUEDE DECLARAR LA VARIABLE PORQUE EL TIPO DE LA EXPRESION ASIGNADA NO COINCIDE CON EL TIPO DE LA DECLARACION");
            }
        }
        catch (e) {
            for (var i = 0; i < this.asignacion.length; i++) {
                var iden = this.asignacion[i];
                if (iden) {
                    environment.guardar(iden, null, this.type);
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
                }
            }
        }
    };
    Declaration.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoDeclaration" + x.toString();
        try {
            var assigval2 = this.asignacion.draw();
            var assigval = "";
            assigval = assigval + assigval2.rama + ("\n            " + nombreNodoPrincipal + " -> " + assigval2.nodo + ";\n            ");
            var rama = "\n            " + nombreNodoPrincipal + "[label=\"DECLARATION\"];\n            nodotipo" + nombreNodoPrincipal + "[label=\"TIPO DE DATO\"];\n            nodotipoval" + nombreNodoPrincipal + "[label=\"" + this.type.toString() + "\"];\n            " + assigval + "\n            " + nombreNodoPrincipal + " -> nodotipo" + nombreNodoPrincipal + " -> nodotipoval" + nombreNodoPrincipal + ";\n            ";
            return { rama: rama, nodo: nombreNodoPrincipal.toString() };
        }
        catch (e) {
            var rama = "\n            " + nombreNodoPrincipal + "[label=\"DECLARATION\"];\n            nodotipo" + nombreNodoPrincipal + "[label=\"TIPO DE DATO\"];\n            nodotipoval" + nombreNodoPrincipal + "[label=\"" + this.type.toString() + "\"];\n            " + nombreNodoPrincipal + " -> nodotipo" + nombreNodoPrincipal + " -> nodotipoval" + nombreNodoPrincipal + ";\n            ";
            return { rama: rama, nodo: nombreNodoPrincipal.toString() };
        }
    };
    return Declaration;
}(Instrucciones_1.Instruction));
exports.Declaration = Declaration;
