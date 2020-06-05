// Archivo de configuracion
require('./server/config/config');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Conectar angular con el servidor
app.use(cors());

// Configuración global de rutas
app.use(require('./server/routes/index'));


// Conectar a la BD
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, resp) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');
    });


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT);

});