"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var Symbol_1 = require("./Symbol");
var TablaSimbolos_1 = require("../Reportes/TablaSimbolos");
var Environment = /** @class */ (function () {
    function Environment(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
    }
    Environment.prototype.guardar = function (id, valor, type) {
        var env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                var sim = new Symbol_1.Symbol("VARIABLE", id, type);
                TablaSimbolos_1.TablaSim.push(sim);
                env.variables.set(id, new Symbol_1.Symbol(valor, id, type));
                return;
            }
            env = env.anterior;
        }
        var sim2 = new Symbol_1.Symbol("VARIABLE", id, type);
        this.variables.set(id, new Symbol_1.Symbol(valor, id, type));
        TablaSimbolos_1.TablaSim.push(sim2);
    };
    Environment.prototype.guardarFuncion = function (id, funcion) {
        var env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                var sim = new Symbol_1.Symbol("FUNCION", id, funcion.type);
                TablaSimbolos_1.TablaSim.push(sim);
                this.funciones.set(id, funcion);
                return;
            }
            env = env.anterior;
        }
        var sim2 = new Symbol_1.Symbol("FUNCION", id, funcion.type);
        TablaSimbolos_1.TablaSim.push(sim2);
        this.funciones.set(id, funcion);
    };
    Environment.prototype.getVar = function (id) {
        var env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    };
    Environment.prototype.getFuncion = function (id) {
        var env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    };
    Environment.prototype.getGlobal = function () {
        var env = this;
        while ((env === null || env === void 0 ? void 0 : env.anterior) != null) {
            env = env.anterior;
        }
        return env;
    };
    return Environment;
}());
exports.Environment = Environment;
