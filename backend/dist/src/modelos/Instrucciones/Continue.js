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
exports.Continue = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Retorno_1 = require("../Abstract/Retorno");
var Continue = /** @class */ (function (_super) {
    __extends(Continue, _super);
    function Continue(line, column) {
        return _super.call(this, line, column) || this;
    }
    Continue.prototype.execute = function (environment) {
        return { line: this.line, column: this.column, type: Retorno_1.Type.CONTINUE };
    };
    return Continue;
}(Instrucciones_1.Instruction));
exports.Continue = Continue;
