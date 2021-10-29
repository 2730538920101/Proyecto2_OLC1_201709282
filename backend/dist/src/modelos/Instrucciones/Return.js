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
exports.Return = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Retorno_1 = require("../Abstract/Retorno");
var Return = /** @class */ (function (_super) {
    __extends(Return, _super);
    function Return(expr, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.expr = expr;
        return _this;
    }
    Return.prototype.execute = function (environment) {
        if (this.expr != null) {
            var value = this.expr.execute(environment);
            return { value: value, type: Retorno_1.Type.RETURN };
        }
        else {
            return { value: null, type: Retorno_1.Type.RETURN };
        }
    };
    Return.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoReturn" + x.toString();
        var valor = this.expr.draw();
        var rama = "\n        " + nombreNodoPrincipal + "[label=\"RETURN\"];\n        " + valor.rama + "\n        " + nombreNodoPrincipal + " -> " + valor.nodo + ";\n        ";
        return { rama: rama, nodo: nombreNodoPrincipal.toString() };
    };
    return Return;
}(Instrucciones_1.Instruction));
exports.Return = Return;
