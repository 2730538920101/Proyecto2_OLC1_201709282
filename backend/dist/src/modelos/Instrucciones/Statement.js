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
exports.Statement = void 0;
var Instrucciones_1 = require("../Abstract/Instrucciones");
var Enviorment_1 = require("../Symbol/Enviorment");
var ErrorList_1 = require("../Errores/ErrorList");
var Statement = /** @class */ (function (_super) {
    __extends(Statement, _super);
    function Statement(code, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.code = code;
        return _this;
    }
    Statement.prototype.execute = function (env) {
        var newEnv = new Enviorment_1.Environment(env);
        for (var _i = 0, _a = this.code; _i < _a.length; _i++) {
            var instr = _a[_i];
            try {
                var element = instr.execute(newEnv);
                if (element != undefined || element != null)
                    return element;
            }
            catch (MiError) {
                ErrorList_1.errores.push(MiError);
            }
        }
    };
    return Statement;
}(Instrucciones_1.Instruction));
exports.Statement = Statement;
