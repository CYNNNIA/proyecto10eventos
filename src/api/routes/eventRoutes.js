const express = require('express')
const {
  createEvent,
  getEvents,
  addAttendee
} = require('../controllers/eventController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/create', authMiddleware, createEvent) // Protegida con JWT
router.get('/', authMiddleware, getEvents) // Protegida con JWT
router.post('/attend/:eventId', authMiddleware, addAttendee) // Protegida con JWT

module.exports = router
