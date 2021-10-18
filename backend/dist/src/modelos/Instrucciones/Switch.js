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
exports.Switch = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch(cambio, casos, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.cambio = cambio;
        _this.casos = casos;
        return _this;
    }
    Switch.prototype.execute = function (environment) {
        for (var i = 0; i < this.casos.length; i++) {
            var caso = this.casos[i].execute(environment);
            if (this.cambio.execute(environment) == caso) {
                return caso;
            }
            else if (caso == null) {
                return caso;
            }
        }
    };
    return Switch;
}(Instrucciones_1.Instruction));
exports.Switch = Switch;
