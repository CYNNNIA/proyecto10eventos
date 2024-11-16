const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '48h'
  })
}

module.exports = { generateToken }