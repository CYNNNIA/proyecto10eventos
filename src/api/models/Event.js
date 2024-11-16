const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  attendees: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
