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
exports.ArithmeticAccessI = void 0;
var Error_1 = require("../Errores/Error");
var Instrucciones_1 = require("../Abstract/Instrucciones");
var ArithmeticAccessI = /** @class */ (function (_super) {
    __extends(ArithmeticAccessI, _super);
    function ArithmeticAccessI(id, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        return _this;
    }
    ArithmeticAccessI.prototype.execute = function (environment) {
        var value = environment.getVar(this.id);
        if (value == null) {
            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA VARIABLE NO EXISTE");
        }
        else {
            value.valor = Number(value.valor) + 1;
            environment.guardar(this.id, value.valor, value.type);
        }
    };
    return ArithmeticAccessI;
}(Instrucciones_1.Instruction));
exports.ArithmeticAccessI = ArithmeticAccessI;
