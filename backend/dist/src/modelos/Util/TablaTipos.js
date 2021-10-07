"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaUnario = exports.TablaModulo = exports.TablaPotencia = exports.TablaDivision = exports.TablaMultiplicacion = exports.TablaResta = exports.TablaSuma = void 0;
var Retorno_1 = require("../Abstract/Retorno");
exports.TablaSuma = [
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.INT, Retorno_1.Type.INT, Retorno_1.Type.STRING],
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.STRING],
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.STRING],
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.STRING, Retorno_1.Type.STRING],
    [Retorno_1.Type.STRING, Retorno_1.Type.STRING, Retorno_1.Type.STRING, Retorno_1.Type.STRING, Retorno_1.Type.STRING]
];
exports.TablaResta = [
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.INT, Retorno_1.Type.INT, Retorno_1.Type.NULL],
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL],
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL]
];
exports.TablaMultiplicacion = [
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.INT, Retorno_1.Type.NULL],
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL]
];
exports.TablaDivision = [
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL],
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL]
];
exports.TablaPotencia = [
    [Retorno_1.Type.INT, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL]
];
exports.TablaModulo = [
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.DOUBLE, Retorno_1.Type.DOUBLE, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL, Retorno_1.Type.NULL]
];
exports.TablaUnario = [
    [Retorno_1.Type.INT],
    [Retorno_1.Type.DOUBLE],
    [Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL],
    [Retorno_1.Type.NULL]
];
