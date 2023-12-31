const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, 'secreto', (error, decoded) => {
      if (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ error: 'Token no válido' });
      }

      req.usuario = decoded.userId;
      next();
    });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ error: 'Error al verificar el token' });
  }
};

module.exports = authMiddleware;