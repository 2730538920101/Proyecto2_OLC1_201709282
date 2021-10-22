"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var List = /** @class */ (function () {
    function List(type) {
        this.type = type;
        this.values = [];
    }
    List.prototype.getValue = function (index) {
        return this.values[index];
    };
    List.prototype.setValue = function (index, value) {
        this.values[index] = value;
    };
    List.prototype.append = function (value) {
        this.values.push(value);
    };
    return List;
}());
exports.List = List;
