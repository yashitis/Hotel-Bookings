const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    bookingType: { type: String, required: true },
    bookingSlot: { type: String },
    bookingTime: { type: String },
});

module.exports = mongoose.model('Booking', bookingSchema);
