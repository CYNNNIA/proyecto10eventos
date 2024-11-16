const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  try {
    // Extrae el token del encabezado de autorización
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Acceso denegado. No se proporcionó un token' })
    }

    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    req.user = user // Añade el usuario a la solicitud
    next() // Continúa a la siguiente función
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

module.exports = authMiddleware
