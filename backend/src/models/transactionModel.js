// models/transaccion.js
const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  usuarioE: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo de Usuario
    required: true,
  },
  usuarioR: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo de Usuario
    required: true,
  },
  usuarioN:{
    type: String,
    required:true
  },
  tipo: {
    type: String,
    enum: ['DEPOSITO', 'RETIRO', 'TRANSFERENCIA'],
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Transaccion = mongoose.model('Transaccion', transaccionSchema);

module.exports = Transaccion;
