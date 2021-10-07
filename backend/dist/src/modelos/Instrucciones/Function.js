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
exports.TypeFunction = exports.Function = void 0;
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
    return Function;
}(Instrucciones_1.Instruction));
exports.Function = Function;
var TypeFunction;
(function (TypeFunction) {
    TypeFunction[TypeFunction["INT"] = 0] = "INT";
    TypeFunction[TypeFunction["DOUBLE"] = 1] = "DOUBLE";
    TypeFunction[TypeFunction["BOOLEAN"] = 2] = "BOOLEAN";
    TypeFunction[TypeFunction["CHAR"] = 3] = "CHAR";
    TypeFunction[TypeFunction["STRING"] = 4] = "STRING";
    TypeFunction[TypeFunction["NULL"] = 5] = "NULL";
    TypeFunction[TypeFunction["ARRAY"] = 6] = "ARRAY";
    TypeFunction[TypeFunction["LIST"] = 7] = "LIST";
})(TypeFunction = exports.TypeFunction || (exports.TypeFunction = {}));
