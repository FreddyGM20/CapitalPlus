const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  saldo: {
    type: Number,
    default: 0, // Puedes establecer un valor predeterminado si lo deseas
  },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;