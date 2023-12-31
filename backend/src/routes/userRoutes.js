// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const usuarioController = require('../controllers/userController');

// Configuración de las rutas y las validaciones
// Ruta protegida que requiere autenticación
router.get('/user-info', authMiddleware, usuarioController.getUserInfo);
router.post('/signup', usuarioController.registro);
router.post('/login', usuarioController.login);

module.exports = router;
