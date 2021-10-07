"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiError = exports.TypeError = void 0;
var TypeError;
(function (TypeError) {
    TypeError[TypeError["LEXICO"] = 0] = "LEXICO";
    TypeError[TypeError["SINTACTICO"] = 1] = "SINTACTICO";
    TypeError[TypeError["SEMANTICO"] = 2] = "SEMANTICO";
})(TypeError = exports.TypeError || (exports.TypeError = {}));
var MiError = /** @class */ (function () {
    function MiError(line, column, type, message) {
        this.line = line;
        this.column = column;
        this.type = type;
        this.message = message;
    }
    return MiError;
}());
exports.MiError = MiError;
