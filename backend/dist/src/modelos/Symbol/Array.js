"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array = void 0;
var Array = /** @class */ (function () {
    function Array() {
        this.values = [];
    }
    Array.prototype.getValue = function (index) {
        return this.values[index];
    };
    Array.prototype.setValue = function (index, value) {
        this.values[index] = value;
    };
    return Array;
}());
exports.Array = Array;
