const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
