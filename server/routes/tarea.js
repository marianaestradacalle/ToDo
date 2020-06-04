const express = require('express');
const _ = require('underscore');
const verificaToken = require('../middlewares/autenticacion');

let Tarea = require('../models/tarea');

let app = express();

app.get('/tarea', verificaToken, (req, res) => {

    // Paginacion de tareas
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Tarea.find({})
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, tareas) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            // Conteo de tareas
            Tarea.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    tareas,
                    registros: conteo
                });
            });
        });
});

app.post('/tarea', verificaToken, (req, res) => {

    let body = req.body;

    let tarea = new Tarea({
        usuario: req.usuario._id,
        nombre: body.nombre,
        prioridad: body.prioridad,
        fechaV: body.fechaV
    });

    tarea.save((err, tareaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tarea: tareaDB
        });
    });

});

app.put('/tarea/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'prioridad', 'fechaV']);

    Tarea.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, tareaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tarea: tareaDB
        });
    });
});

app.delete('/tarea/:id', verificaToken, (req, res) => {

    let id = req.params.id;



    Tarea.findByIdAndDelete(id, (err, tareaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!tareaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Tarea no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            tarea: tareaDB
        });
    });
});


module.exports = app;