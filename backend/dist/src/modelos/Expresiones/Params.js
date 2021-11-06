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
var Retorno_1 = require("../Abstract/Retorno");
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
        if (this.type == Retorno_1.Type.LIST) {
            environment.guardar(this.id, '', Retorno_1.Type.LIST);
            return { value: this.id, type: Retorno_1.Type.LIST };
        }
        else if (this.type == Retorno_1.Type.ARRAY) {
            environment.guardar(this.id, '', Retorno_1.Type.ARRAY);
            return { value: this.id, type: Retorno_1.Type.ARRAY };
        }
        else {
            environment.guardar(this.id, '', this.type);
            return { value: this.id, type: this.type };
        }
    };
    Params.prototype.draw = function () {
        var x = Math.floor(Math.random() * (100 - 0) + 0);
        var nombreNodoPrincipal = "nodoParametro" + x.toString();
        var rama = "\n        " + nombreNodoPrincipal + "[label=\"Parametro\"];\n        nodoid" + nombreNodoPrincipal + "[label=\"ID\"];\n        nodoidval" + nombreNodoPrincipal + "[label=\"" + this.id + "\"];\n        tipodato" + nombreNodoPrincipal + "[label=\"TIPO DE DATO\"];\n        tipodatoval" + nombreNodoPrincipal + "[label=\"" + this.type.toString() + "\"];\n        " + nombreNodoPrincipal + " -> nodoid" + nombreNodoPrincipal + " -> nodoidval" + nombreNodoPrincipal + ";\n        " + nombreNodoPrincipal + " -> tipodato" + nombreNodoPrincipal + " -> tipodatoval" + nombreNodoPrincipal + ";\n        ";
        return { rama: rama, nodo: nombreNodoPrincipal.toString() };
    };
    return Params;
}(Expresiones_1.Expression));
exports.Params = Params;
