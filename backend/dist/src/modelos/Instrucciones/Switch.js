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
exports.Switch = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Error_1 = require("../Errores/Error");
var Retorno_1 = require("../Abstract/Retorno");
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch(cambio, casos, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.cambio = cambio;
        _this.casos = casos;
        return _this;
    }
    Switch.prototype.execute = function (environment) {
        var actual = this.cambio.execute(environment);
        for (var i = 0; i < this.casos.length; i++) {
            var casoexp = this.casos[i].getExp();
            if (casoexp != null) {
                var casoactual = casoexp.execute(environment);
                if (actual.type == casoactual.type) {
                    if (actual.value == casoactual.value) {
                        var element = this.casos[i].execute(environment);
                        if (element != null || element != undefined) {
                            if (element.type == Retorno_1.Type.BREAK) {
                                break;
                            }
                            else {
                                return element;
                            }
                        }
                    }
                }
                else {
                    throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "EL VALOR DEL CASE NO ES DEL MISMO TIPO QUE EL VALOR ASIGNADO EN EL SWITCH");
                }
            }
            else {
                var element = this.casos[i].execute(environment);
                if (element != null || element != undefined) {
                    if (element.type == Retorno_1.Type.BREAK) {
                        break;
                    }
                    else {
                        return element;
                    }
                }
            }
        }
    };
    Switch.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoSwitch" + x.toString();
        var expExp = this.cambio.draw();
        var rama = "\n        " + nombreNodoPrincipal + "[label=\"SWITCH\"];\n        " + expExp.rama + "\n        " + nombreNodoPrincipal + " -> " + expExp.nodo + ";\n        ";
        for (var i = 0; i < this.casos.length; i++) {
            var caso = this.casos[i].draw();
            rama = rama + ("\n            " + caso.rama + "\n            " + nombreNodoPrincipal + " -> " + caso.nodo + ";\n            ");
        }
        return { rama: rama, nodo: nombreNodoPrincipal.toString() };
    };
    return Switch;
}(Instrucciones_1.Instruction));
exports.Switch = Switch;
