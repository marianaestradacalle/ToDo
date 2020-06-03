const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let estadosValidos = {
    values: ['1. Completado', '2. Pendiente', '3. En progreso', '4. Vencido'],
    message: '{VALUE} no es válido'
};

let estadoSchema = new Schema({
    nombre: {
        type: String,
        default: '2. Pendiente',
        enum: estadosValidos
    }
});

module.exports = mongoose.model('Estado', estadoSchema);