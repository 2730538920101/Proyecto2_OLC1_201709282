const server = require('./server');
const servidor = server.listen(3000, ()=>{
    console.log('ESCUCHANDO AL SERVIDOR EN EL PUERTO 3000');
});

