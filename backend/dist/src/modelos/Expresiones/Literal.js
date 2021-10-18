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
exports.Literal = void 0;
var Expresiones_1 = require("../Abstract/Expresiones");
var Retorno_1 = require("../Abstract/Retorno");
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(value, line, column, type) {
        var _this = _super.call(this, line, column) || this;
        _this.value = value;
        _this.type = type;
        return _this;
    }
    Literal.prototype.execute = function () {
        if (this.type == 0) {
            return { value: Number(this.value), type: Retorno_1.Type.INT };
        }
        else if (this.type == 1) {
            return { value: Number(this.value), type: Retorno_1.Type.DOUBLE };
        }
        else if (this.type == 2) {
            return { value: this.value.toString().toLowerCase(), type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.type == 3) {
            return { value: this.value.charCodeAt(0), type: Retorno_1.Type.CHAR };
        }
        else if (this.type == 4) {
            return { value: this.value, type: Retorno_1.Type.STRING };
        }
        else {
            return { value: null, type: Retorno_1.Type.NULL };
        }
    };
    return Literal;
}(Expresiones_1.Expression));
exports.Literal = Literal;
