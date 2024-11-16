const bcrypt = require('bcryptjs') // Para encriptar contraseñas
const User = require('../models/User') // El modelo de usuario
const { generateToken } = require('../utils/jwt') // Importa generateToken

// Función de login (inicio de sesión)
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Busca el usuario en la base de datos por su correo
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' })
    }

    // Compara la contraseña ingresada con la guardada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' })
    }

    // Genera un token para el usuario
    const token = generateToken(user._id)

    // Devuelve el token al cliente
    res.json({ token, user })
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión', error })
  }
}

module.exports = { login }
