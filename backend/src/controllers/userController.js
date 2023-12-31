// controllers/usuarioController.js

const Usuario = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.registro = async (req, res) => {
  const { nombre, apellido, email, password, confirmPassword } = req.body;

  if (!nombre || !apellido || !email || !password || !confirmPassword) {
    return res.status(201).json({ status: "error", error: "Existen campos vacíos" });
  }
  // Validar que 'email' sea una dirección de correo electrónico válida
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(201)
      .json({
        status: "error",
        error: "Ingrese una dirección de correo electrónico válida",
      });
  }
  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    return res
      .status(201)
      .json({ status: "error", error: "Las contraseñas no coinciden" });
  }

  try {
    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña hasheada
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      password: hashedPassword, // Almacenar el hash en lugar de la contraseña original
    });

    await nuevoUsuario.save();
    res.json({ status: "success", mensaje: "Registro exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Error en el registro" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(201).json({ status: 'error', error: 'Correo electronico incorrecto' });
    }
    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) {
      return res.status(201).json({ status: 'error', error: 'Contraseña incorrecta' });
    }
    // Generar el token JWT
    const token = jwt.sign({ userId: usuario._id }, 'secreto', { expiresIn: '1h' });
    
    res.json({ status: 'success', mensaje: 'Inicio de sesión exitoso', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Error en el inicio de sesión' });
  }
};
exports.getUserInfo = async (req, res) => {
  try {
    // El objeto del usuario está disponible en req.usuario gracias al middleware de autenticación
    const usuarioId = req.usuario;

    // Buscar la información del usuario en la base de datos
    const informacionUsuario = await Usuario.findById(usuarioId).select('-password');

    res.json(informacionUsuario);
  } catch (error) {
    console.error('Error al obtener la información del usuario', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
