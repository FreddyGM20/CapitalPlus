// controllers/transaccionController.js
const Usuario = require("../models/userModel.js");
const Transaccion = require("../models/transactionModel.js"); // Modelo para el registro de transacciones

exports.realizarDeposito = async (req, res) => {
  const usuarioId = req.usuario;
  const { monto } = req.body;

  // Buscar la información del usuario en la base de datos

  try {
    const usuario = await Usuario.findById(usuarioId).select("-password");

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    try {
      // Realizar el depósito
      usuario.saldo += monto;

      // Guardar el usuario actualizado
      await usuario.save();

      // Guardar la información de la transacción en otro lugar (por ejemplo, en una colección separada)
      const registroTransaccion = new Transaccion({
        usuarioE: usuario._id,
        usuarioR: usuario._id, // Ajusta según la estructura de tu modelo Usuario
        usuarioN: `${usuario.nombre} ${usuario.apellido}`,
        fecha: new Date(),
        tipo: "DEPOSITO",
        monto: monto,
      });

      await registroTransaccion.save();

      res.json({ status: "success", mensaje: "Depósito realizado con éxito" });
    } catch (error) {
      // Si hay un error, revertir la transacción
      throw error;
    }
  } catch (error) {
    console.error("Error al realizar el depósito", error);
    res.status(500).json({ status: "error", mensaje: "Error en el servidor" });
  }
};

exports.obtenerTransaccionesUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuario;

    // Buscar transacciones donde el usuario es el emisor (usuarioE)
    const transaccionesEmisor = await Transaccion.find({ usuarioE: usuarioId });

    // Buscar transacciones donde el usuario es el receptor (usuarioR)
    const transaccionesReceptor = await Transaccion.find({
      usuarioR: usuarioId,
    });

    // Combinar todas las transacciones en una lista
    const transacciones = [...transaccionesEmisor, ...transaccionesReceptor];

    // Ordenar las transacciones por la fecha en orden descendente
    const transaccionesOrdenadas = transacciones.sort((a, b) => b.fecha - a.fecha);

    res.status(200).json(transaccionesOrdenadas);
  } catch (error) {
    console.error("Error al obtener transacciones del usuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Controlador para realizar retiros
exports.realizarRetiro = async (req, res) => {
  try {
    const usuarioId = req.usuario;
    const { monto } = req.body;

    // Verificar que el usuario tenga suficiente saldo para el retiro
    const usuario = await Usuario.findById(usuarioId).select("-password");
    if (!usuario) {
      return res
        .status(404)
        .json({ status: "error", mensaje: "Usuario no encontrado" });
    }

    if (usuario.saldo < monto) {
      return res.status(400).json({
        status: "error",
        mensaje: "Saldo insuficiente para realizar el retiro",
      });
    }

    // Realizar el depósito
    usuario.saldo -= monto;

    // Guardar el usuario actualizado
    await usuario.save();

    // Guardar la información de la transacción en otro lugar (por ejemplo, en una colección separada)
    const registroTransaccion = new Transaccion({
      usuarioE: usuario._id,
      usuarioR: usuario._id, // Ajusta según la estructura de tu modelo Usuario
      usuarioN: `${usuario.nombre} ${usuario.apellido}`,
      fecha: new Date(),
      tipo: "RETIRO",
      monto: monto,
    });

    await registroTransaccion.save();

    res
      .status(200)
      .json({ status: "success", mensaje: "Depósito realizado con éxito" });
  } catch (error) {
    console.error("Error al realizar el retiro", error);
    res
      .status(500)
      .json({ mensaje: "Error al realizar el retiro", error: error.message });
  }
};
exports.realizarTransferencia = async (req, res) => {
  try {
    const usuarioOrigenId = req.usuario; // ID del usuario que realiza la transferencia
    const { usuarioDestino, monto } = req.body;

    // Verificar que el usuario de destino exista
    const usuarioDestinoEncontrado = await Usuario.findOne({
      _id: usuarioDestino,
    });
    if (!usuarioDestinoEncontrado) {
      return res
        .status(201)
        .json({ status:"error", error: "Usuario de destino no encontrado" });
    }

    // Verificar que el usuario de origen tenga suficiente saldo para la transferencia
    const usuarioOrigen = await Usuario.findById(usuarioOrigenId).select("-password");
    if (!usuarioOrigen) {
      return res
        .status(201)
        .json({ status:"error", error: "Usuario de origen no encontrado" });
    }

    if (usuarioOrigen.saldo < monto) {
      return res
        .status(201)
        .json({ status:"error",error: "Saldo insuficiente para realizar la transferencia" });
    }

    usuarioDestinoEncontrado.saldo += monto;
    usuarioOrigen.saldo -= monto;

    await usuarioOrigen.save();
    await usuarioDestinoEncontrado.save();

    const registroTransaccion = new Transaccion({
      usuarioE: usuarioOrigen._id,
      usuarioR: usuarioDestinoEncontrado._id,
      usuarioN: `${usuarioOrigen.nombre} ${usuarioOrigen.apellido}`,
      fecha: new Date(),
      tipo: "TRANSFERENCIA",
      monto: monto,
    });

    // Guardar la transacción en la base de datos
    await registroTransaccion.save();

    res
      .status(200)
      .json({ status: "success", mensaje: "Transferencia exitosa" });
  } catch (error) {
    console.error("Error al realizar la transferencia", error);
    res.status(500).json({
      mensaje: "Error al realizar la transferencia",
      error: error.message,
    });
  }
};
