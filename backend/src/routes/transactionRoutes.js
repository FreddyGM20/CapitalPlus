// routes/transaccionRoutes.js
const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para realizar un depósito
router.post('/deposito', authMiddleware, transaccionController.realizarDeposito);
router.get('/', authMiddleware,transaccionController.obtenerTransaccionesUsuario)
// Endpoint para realizar retiros
router.post('/withdraw',authMiddleware, transaccionController.realizarRetiro);
// Ruta para realizar transferencia
router.post('/transferencia', authMiddleware, transaccionController.realizarTransferencia);

// Otras rutas relacionadas con transacciones (retiros, transferencias, etc.) pueden seguir un enfoque similar

module.exports = router;