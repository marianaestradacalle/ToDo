const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let estadosValidos = {
    values: ['1. Completado', '2. Pendiente', '3. En progreso', '4. Vencido'],
    message: '{VALUE} no es válido'
};

let tareaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la tarea es requerido']
    },
    prioridad: {
        type: String,
        required: [true, 'Se requiere el nivel de prioridad de la tarea']
    },
    fechaV: {
        type: Date,
        required: [true, 'La fecha de vencimiento es requerida']
    },
    estado: {
        type: String,
        default: '2. Pendiente',
        enum: estadosValidos
    },
    proxV: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Tarea', tareaSchema);