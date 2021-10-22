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
exports.ArithmeticAccess2 = void 0;
var Error_1 = require("../Errores/Error");
var Expresiones_1 = require("../Abstract/Expresiones");
var ArithmeticAccess2 = /** @class */ (function (_super) {
    __extends(ArithmeticAccess2, _super);
    function ArithmeticAccess2(id, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        return _this;
    }
    ArithmeticAccess2.prototype.execute = function (environment) {
        var value = environment.getVar(this.id);
        if (value == null) {
            throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA VARIABLE NO EXISTE");
        }
        else {
            value.valor = Number(value.valor) - 1;
            environment.guardar(this.id, value.valor, value.type);
            return { value: value.valor, type: value.type };
        }
    };
    return ArithmeticAccess2;
}(Expresiones_1.Expression));
exports.ArithmeticAccess2 = ArithmeticAccess2;
