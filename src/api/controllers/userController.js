const user = require('../models/User')

const getUser = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.user._id).select('-password')
    if (!foundUser) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      })
    }
    res.json(foundUser)
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el usuario',
      error
    })
  }
}

module.exports = { getUser }
