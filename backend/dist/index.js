"use strict";
var server = require('../src/server');
var servidor = server.listen(3000, function () {
    console.log(' ESCUCHANDO AL SERVIDOR EN EL PUERTO 3000');
});
