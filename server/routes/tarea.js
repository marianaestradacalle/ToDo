const express = require('express');
const _ = require('underscore');
const verificaToken = require('../middlewares/autenticacion');
const moment = require('moment');
const { ObjectId } = require('mongoose').Types;

let Tarea = require('../models/tarea');

let app = express();

app.get('/tarea', verificaToken, (req, res) => {

    const id = req.usuario._id;
    let hoy = moment([2020, 05, 04]);



    // Paginacion de tareas
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Tarea.find({ 'usuario': new ObjectId(id) })
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

            tareas.forEach((tarea) => {
                let fechaV = moment([2020, 05, 10]);
                console.log(fechaV);
                console.log(hoy);


                if (hoy.diff(fechaV, 'days')) {
                    console.log('Se va a vencer la tarea', fechaV.diff(hoy, 'days'));
                }
            });

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

app.get('/tarea/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Tarea.findById(id, (err, tareaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!tareaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            tarea: tareaDB
        });
    });
});

app.post('/tarea', verificaToken, (req, res) => {

    let body = req.body;
    let tarea = new Tarea({
        usuario: req.usuario._id,
        nombre: body.nombre,
        prioridad: body.prioridad,
        fechaV: moment(body.fechaV).format('DD-MM-YYYY')
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