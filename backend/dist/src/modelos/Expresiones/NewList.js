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
exports.NewList = void 0;
var Expresiones_1 = require("../Abstract/Expresiones");
var Retorno_1 = require("../Abstract/Retorno");
var List_1 = require("../Symbol/List");
var NewList = /** @class */ (function (_super) {
    __extends(NewList, _super);
    function NewList(type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.type = type;
        return _this;
    }
    NewList.prototype.execute = function (environment) {
        var array = new List_1.List();
        return { value: array, type: Retorno_1.Type.LIST };
    };
    return NewList;
}(Expresiones_1.Expression));
exports.NewList = NewList;
