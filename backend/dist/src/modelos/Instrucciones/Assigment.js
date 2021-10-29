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
exports.Assigment = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Retorno_1 = require("../Abstract/Retorno");
var Error_1 = require("../Errores/Error");
var Assigment = /** @class */ (function (_super) {
    __extends(Assigment, _super);
    function Assigment(id, value, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.value = value;
        return _this;
    }
    Assigment.prototype.execute = function (environment) {
        var val = this.value.execute(environment);
        if (val != null || val != undefined) {
            for (var i = 0; i < this.id.length; i++) {
                var iden = environment.getVar(this.id[i]);
                if (iden != null || iden != undefined) {
                    environment.guardar(this.id[0], val.value, val.type);
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
                }
            }
        }
        else {
            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO SE PUEDE ASIGNAR EL VALOR");
        }
    };
    Assigment.prototype.getType = function (environment) {
        if (this.value.execute(environment).type == Retorno_1.Type.ARRAY) {
            return this.value.execute(environment).value.getValue(0).type;
        }
        else if (this.value.execute(environment).type == Retorno_1.Type.LIST) {
            return this.value.execute(environment).value.type;
        }
        else {
            return this.value.execute(environment).type;
        }
    };
    Assigment.prototype.getId = function () {
        return this.id[0];
    };
    Assigment.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoAssigment" + x.toString();
        var expExp = this.value.draw();
        var rama = "\n        " + nombreNodoPrincipal + "[label=\"ASSIGMENT\"];\n        nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n        nodoidval" + nombreNodoPrincipal + "[label=\"" + this.getId() + "\"];\n        " + expExp.rama + "\n        " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n        " + nombreNodoPrincipal + " -> " + expExp.nodo + ";\n        ";
        return { rama: rama, nodo: nombreNodoPrincipal.toString() };
    };
    return Assigment;
}(Instrucciones_1.Instruction));
exports.Assigment = Assigment;
