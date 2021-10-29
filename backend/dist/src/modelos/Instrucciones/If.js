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
exports.If = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Retorno_1 = require("../Abstract/Retorno");
var Error_1 = require("../Errores/Error");
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(condition, code, statement, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condition = condition;
        _this.code = code;
        _this.statement = statement;
        return _this;
    }
    If.prototype.execute = function (env) {
        var _a;
        var condition = this.condition.execute(env);
        if (condition.type != Retorno_1.Type.BOOLEAN) {
            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA CONDICION NO RETORNA UN VALOR BOOLEANO");
        }
        else {
            if (condition.value === true) {
                return this.code.execute(env);
            }
            else if (condition.value === false) {
                return (_a = this.statement) === null || _a === void 0 ? void 0 : _a.execute(env);
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA CONDICION NO SE HA PODIDO EVALUAR");
            }
        }
    };
    If.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoIf" + x.toString();
        var cond = this.condition.draw();
        var inst = this.code.draw();
        if (this.statement != null) {
            var elsest = this.statement.draw();
            var ramaelse = "\n            " + nombreNodoPrincipal + "[label=\"IF / ELSE IF\"];\n            " + cond.rama + "\n            " + inst.rama + "\n            nodoelse" + nombreNodoPrincipal + "[label=\"ELSE\"];\n            " + elsest.rama + "\n            " + nombreNodoPrincipal + " -> " + cond.nodo + ";\n            " + nombreNodoPrincipal + " -> " + inst.nodo + ";\n            " + nombreNodoPrincipal + " -> nodoelse" + nombreNodoPrincipal + " -> " + elsest.nodo + ";\n            ";
            return { rama: ramaelse, nodo: nombreNodoPrincipal.toString() };
        }
        else {
            var ramaif = "\n            " + nombreNodoPrincipal + "[label=\"IF / ELSE IF\"];\n            " + cond.rama + "\n            " + inst.rama + "\n            " + nombreNodoPrincipal + " -> " + cond.nodo + ";\n            " + nombreNodoPrincipal + " -> " + inst.nodo + ";\n            ";
            return { rama: ramaif, nodo: nombreNodoPrincipal.toString() };
        }
    };
    return If;
}(Instrucciones_1.Instruction));
exports.If = If;
