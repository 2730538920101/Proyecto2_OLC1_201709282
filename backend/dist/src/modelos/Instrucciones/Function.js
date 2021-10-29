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
exports.Function = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Function = /** @class */ (function (_super) {
    __extends(Function, _super);
    function Function(id, type, statment, parametros, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.type = type;
        _this.statment = statment;
        _this.parametros = parametros;
        return _this;
    }
    Function.prototype.execute = function (environment) {
        environment.guardarFuncion(this.id, this);
    };
    Function.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoFunction" + x.toString();
        var param = "";
        var inst = this.statment.draw();
        for (var i = 0; i < this.parametros.length; i++) {
            var par = this.parametros[i].draw();
            param = param + ("\n            nodoparam" + nombreNodoPrincipal + i + "[label=\"PARAMETRO\"];\n            " + par.rama + "\n            " + nombreNodoPrincipal + " -> nodoparam" + nombreNodoPrincipal + i + " -> " + par.nodo + ";\n            ");
        }
        var rama = "\n        " + nombreNodoPrincipal + "[label=\"FUNCTION\"];\n        nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n        nodoidval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n        " + param + "\n        " + inst.rama + "\n        nodotipo" + nombreNodoPrincipal + "[label=\"TIPO DE DATO\"];\n        nodotipoval" + nombreNodoPrincipal + "[label=\"" + this.type.toString() + "\"];\n        " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n        " + nombreNodoPrincipal + " -> nodotipo" + nombreNodoPrincipal + " -> nodotipoval" + nombreNodoPrincipal + ";\n        " + nombreNodoPrincipal + " -> " + inst.nodo + ";\n        ";
        return { rama: rama, nodo: nombreNodoPrincipal.toString() };
    };
    return Function;
}(Instrucciones_1.Instruction));
exports.Function = Function;
