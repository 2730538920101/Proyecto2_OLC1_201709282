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
exports.Params = void 0;
var Expresiones_1 = require("../Abstract/Expresiones");
var Params = /** @class */ (function (_super) {
    __extends(Params, _super);
    function Params(id, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.type = type;
        return _this;
    }
    Params.prototype.execute = function (environment) {
        environment.guardar(this.id, null, this.type);
        return { value: this.id, type: this.type };
    };
    return Params;
}(Expresiones_1.Expression));
exports.Params = Params;