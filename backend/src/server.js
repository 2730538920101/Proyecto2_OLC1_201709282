const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const ruta = require('./routes/rutas');

app.use(bodyParser.json());
app.use(cors());
app.use('/backend/analizar', ruta);



module.exports = app
