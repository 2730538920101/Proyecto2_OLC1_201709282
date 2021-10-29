const express = require('express');
const gram = require('../../dist/src/gramatica/gramatica');
const { errores } = require('../../dist/src/modelos/Errores/ErrorList');
const { MiError, TypeError} = require('../../dist/src/modelos/Errores/Error');
const { Function } = require('../../dist/src/modelos/Instrucciones/Function');
const { Environment } = require('../../dist/src/modelos/Symbol/Enviorment');
const { prints } = require('../../dist/src/modelos/Reportes/Impresiones');
const { TablaSim } = require('../../dist/src/modelos/Reportes/TablaSimbolos');
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
    try{
        let drawast = ``;
        TablaSim.splice(0,TablaSim.length);
        prints.splice(0,prints.length);
        errores.splice(0,errores.length);
        const analisis = gram.parse(code);
        const env = new Environment(null);
        for(const instr of analisis){
            try {
                if(instr instanceof Function)
                    instr.execute(env);
            } catch (MiError) {
                errores.push(MiError);  
            }
        }
    
        for(const instr of analisis){
            if(instr instanceof Function)
                continue;
            try {
                const actual = instr.execute(env);
                if(actual != null || actual != undefined){
                    errores.push(new MiError(actual.line, actual.column, TypeError.SEMANTICO, actual.type + "VARIABLE O FUNCION FUERA DEL AMBITO CORRECTO"));
                }
            } catch (error) {
                errores.push(error);  
            }
        }
        drawast = drawast + `
        digraph G{
            nodoPrincipal[label="AST"];
        `;
        for(let i = 0; i < analisis.length; i++){
            const inst= analisis[i].draw();
            drawast = drawast + `
            ${inst.rama}
            nodoPrincipal -> ${inst.nodo};
            `;
        }
        drawast = drawast + `}`;
        
        const result = {
            "resultado":analisis,
            "prints": prints,
            "errores": errores,
            "tablasimbolos": TablaSim,
            "ast":drawast
        }
        res.send(result)

    }catch(error){
        console.log(error);
    }
    console.log(errores)

});

module.exports = router;

