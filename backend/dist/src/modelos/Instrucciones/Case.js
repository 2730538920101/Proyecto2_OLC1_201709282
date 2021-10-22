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
exports.Case = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Case = /** @class */ (function (_super) {
    __extends(Case, _super);
    function Case(exp, code, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.exp = exp;
        _this.code = code;
        return _this;
    }
    Case.prototype.execute = function (environment) {
        var element = this.code.execute(environment);
        if (element != null || element != undefined) {
            return element;
        }
    };
    Case.prototype.getExp = function () {
        return this.exp;
    };
    return Case;
}(Instrucciones_1.Instruction));
exports.Case = Case;
