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
exports.AccessListAssigment = void 0;
var Retorno_1 = require("../Abstract/Retorno");
var Symbol_1 = require("../Symbol/Symbol");
var Error_1 = require("../Errores/Error");
var Instrucciones_1 = require("../Abstract/Instrucciones");
var AccessListAssigment = /** @class */ (function (_super) {
    __extends(AccessListAssigment, _super);
    function AccessListAssigment(anterior, index, value, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.anterior = anterior;
        _this.index = index;
        _this.value = value;
        return _this;
    }
    AccessListAssigment.prototype.execute = function (environment) {
        for (var i = 0; i < this.anterior.length; i++) {
            var anterior = environment.getVar(this.anterior[i]);
            if (anterior) {
                if (anterior.type != Retorno_1.Type.LIST) {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "NO ES UNA LISTA");
                }
                else {
                    var index = this.index.execute(environment);
                    if (index.type != Retorno_1.Type.INT) {
                        throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL INDICE NO ES UN NUMERO");
                    }
                    else {
                        var valor = this.value.execute(environment);
                        if (valor.type == Retorno_1.Type.CHAR) {
                            var sim = new Symbol_1.Symbol(String.fromCharCode(valor.value), anterior.id, valor.type);
                            anterior.valor.setValue(index.value, sim);
                        }
                        else {
                            var sim = new Symbol_1.Symbol(valor.value, anterior.id, valor.type);
                            anterior.valor.setValue(index.value, sim);
                        }
                    }
                }
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
            }
        }
    };
    AccessListAssigment.prototype.draw = function () {
        var indexExp = this.index.draw();
        var expExp = this.value.draw();
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoAccesListAssigment" + x.toString();
        var rama = "\n        " + nombreNodoPrincipal + "[label = \"AccesListAssigment\"];\n        nodoid" + nombreNodoPrincipal + "[label = \"ID\"];\n        nodoidval" + nombreNodoPrincipal + "[label = " + this.anterior[0] + "];\n        " + indexExp.rama + "\n        " + expExp.rama + "\n        " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n        " + nombreNodoPrincipal + " -> " + indexExp.nodo + ";\n        " + nombreNodoPrincipal + " -> " + expExp.nodo + ";\n        ";
        return { rama: rama, nodo: nombreNodoPrincipal.toString() };
    };
    return AccessListAssigment;
}(Instrucciones_1.Instruction));
exports.AccessListAssigment = AccessListAssigment;
