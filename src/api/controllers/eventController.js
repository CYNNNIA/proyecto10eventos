const Event = require('../models/Event')

const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location } = req.body
    const event = new Event({
      title,
      description,
      date,
      location
    })
    await event.save()
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el evento',
      error
    })
  }
}

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los eventos',
      error
    })
  }
}

const addAttendee = async (req, res, next) => {
  try {
    const { eventId } = req.params

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }

    if (!event.attendees.includes(req.user._id)) {
      event.attendees.push(req.user._id)
      await event.save()
    }

    res.json(event)
  } catch (error) {
    res.status(500).json({
      message: 'Error al agregar asistente al evento',
      error
    })
  }
}

module.exports = { createEvent, getEvents, addAttendee }
