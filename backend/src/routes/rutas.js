const express = require('express');
const gram = require('../../dist/src/gramatica/gramatica');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send(req.body.response);
});

router.post('/', (req, res)=>{
    const nombre = req.body.nombre;
    const code = req.body.code;
    const ventana = {
        "nombre": nombre,
        "code": code
    }
    const analisis = gram.parse(code);
    
    //res.send(analisis);
    const result = {
        "resultado":analisis
    }
    res.send(result)
});

module.exports = router;

