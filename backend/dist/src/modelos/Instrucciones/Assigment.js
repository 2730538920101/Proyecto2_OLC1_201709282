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
        for (var i = 0; i < this.id.length; i++) {
            var valorid = this.id[i].execute(environment).value;
            if (valorid) {
                environment.guardar(valorid, val.value, val.type);
            }
            else {
                throw new Error_1.MiError(this.line, this.column, Error_1.TypeError.SEMANTICO, "LA VARIABLE NO SE ENCUENTRA DECLARADA");
            }
        }
    };
    Assigment.prototype.getType = function (environment) {
        return this.value.execute(environment).type;
    };
    return Assigment;
}(Instrucciones_1.Instruction));
exports.Assigment = Assigment;
