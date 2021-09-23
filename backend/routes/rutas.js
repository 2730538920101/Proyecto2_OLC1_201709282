const express = require('express');

const router = express.Router();

router.get('/', (req,res)=>{
    res.send('metodo get');
});

router.post('/', (req, res)=>{
    const nombre = req.body.nombre;
    const code = req.body.code;
    let mensaje = "El id es: " + nombre +" El contenido es: " + code;
    const ventana = {
        "resultado": mensaje
    }
    res.send(ventana);
});

module.exports = router;

