const express = require('express');
const Booking = require('../models/bookingModel');

const router = express.Router();

// Helper function to check booking conflicts
const isBookingConflict = async (date, type, slot, time) => {
    const bookings = await Booking.find({ bookingDate: date });

    for (const booking of bookings) {
        if (booking.bookingType === 'Full Day') return true;

        if (type === 'Full Day') return true;

        if (type === 'Half Day' && booking.bookingType === 'Half Day' && booking.bookingSlot === slot) return true;

        if (type === 'Custom' && booking.bookingType === 'Half Day' && booking.bookingSlot === (time < '12:00' ? 'First Half' : 'Second Half')) return true;

        if (type === 'Custom' && booking.bookingType === 'Custom' && booking.bookingTime === time) return true;
    }
    return false;
};

// Create Booking
exports.createBooking = async (req, res) => {
    const { customerName, customerEmail, bookingDate, bookingType, bookingSlot, bookingTime } = req.body;

    try {
        // Check for booking conflicts
        const conflict = await isBookingConflict(bookingDate, bookingType, bookingSlot, bookingTime);
        if (conflict) return res.status(400).json({ message: 'Booking conflict exists for the selected date and time.' });

        // Create a new booking
        const booking = new Booking({
            customerName,
            customerEmail,
            bookingDate,
            bookingType,
            bookingSlot: bookingType === 'Half Day' ? bookingSlot : undefined,
            bookingTime: bookingType === 'Custom' ? bookingTime : undefined,
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Booking by ID
exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        res.status(200).json(booking);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Booking
exports.updateBooking = async (req, res) => {
    const { customerName, customerEmail, bookingDate, bookingType, bookingSlot, bookingTime } = req.body;

    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Check for booking conflicts
        const conflict = await isBookingConflict(bookingDate, bookingType, bookingSlot, bookingTime);
        if (conflict) return res.status(400).json({ message: 'Booking conflict exists for the selected date and time.' });

        booking.customerName = customerName || booking.customerName;
        booking.customerEmail = customerEmail || booking.customerEmail;
        booking.bookingDate = bookingDate || booking.bookingDate;
        booking.bookingType = bookingType || booking.bookingType;
        booking.bookingSlot = bookingType === 'Half Day' ? bookingSlot : undefined;
        booking.bookingTime = bookingType === 'Custom' ? bookingTime : undefined;

        await booking.save();
        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = router;
