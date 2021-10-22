"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiArray = void 0;
var MiArray = /** @class */ (function () {
    function MiArray() {
        this.values = [];
    }
    MiArray.prototype.getValue = function (index) {
        return this.values[index];
    };
    MiArray.prototype.setValue = function (index, value) {
        this.values[index] = value;
    };
    return MiArray;
}());
exports.MiArray = MiArray;
