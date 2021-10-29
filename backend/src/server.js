const express = require('express');
const app = express();
const cors = require('cors');

const ruta = require('./routes/rutas');

app.use(express.json());
app.use(cors());
app.use('/backend/analizar', ruta);



module.exports = app
