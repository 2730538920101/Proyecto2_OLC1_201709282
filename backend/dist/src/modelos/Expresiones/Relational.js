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
exports.Relational = exports.RelationalOption = void 0;
var Retorno_1 = require("../Abstract/Retorno");
var Expresiones_1 = require("../Abstract/Expresiones");
var RelationalOption;
(function (RelationalOption) {
    RelationalOption[RelationalOption["IGUAL_IGUAL"] = 0] = "IGUAL_IGUAL";
    RelationalOption[RelationalOption["DIFERENCIA"] = 1] = "DIFERENCIA";
    RelationalOption[RelationalOption["MENOR"] = 2] = "MENOR";
    RelationalOption[RelationalOption["MENOR_IGUAL"] = 3] = "MENOR_IGUAL";
    RelationalOption[RelationalOption["MAYOR"] = 4] = "MAYOR";
    RelationalOption[RelationalOption["MAYOR_IGUAL"] = 5] = "MAYOR_IGUAL";
})(RelationalOption = exports.RelationalOption || (exports.RelationalOption = {}));
var Relational = /** @class */ (function (_super) {
    __extends(Relational, _super);
    function Relational(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Relational.prototype.execute = function (environment) {
        var leftValue = this.left.execute(environment);
        var rightValue = this.right.execute(environment);
        if (this.type == RelationalOption.IGUAL_IGUAL) {
            var result = leftValue.value == rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.DIFERENCIA) {
            var result = leftValue.value != rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.MENOR) {
            var result = leftValue.value < rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.MENOR_IGUAL) {
            var result = leftValue.value <= rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.MAYOR) {
            var result = leftValue.value > rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.MAYOR_IGUAL) {
            var result = leftValue.value >= rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else {
            return { value: null, type: Retorno_1.Type.NULL };
        }
    };
    return Relational;
}(Expresiones_1.Expression));
exports.Relational = Relational;
