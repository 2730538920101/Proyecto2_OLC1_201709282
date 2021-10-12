"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var List = /** @class */ (function () {
    function List() {
        this.values = [];
    }
    List.prototype.getValue = function (index) {
        return this.values[index];
    };
    List.prototype.setValue = function (index, value) {
        this.values[index] = value;
    };
    return List;
}());
exports.List = List;
