import React, { useState } from 'react';
import { createBooking } from '../services/api';

const BookingForm = () => {
    const [form, setForm] = useState({
        customerName: '',
        customerEmail: '',
        bookingDate: '',
        bookingType: '',
        bookingSlot: '',
        bookingTime: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createBooking(form);
            alert('Booking Successful: ' + JSON.stringify(data.booking));
        } catch (error) {
            alert('Error: ' + error.response?.data?.message || 'Error creating booking');
        }
    };

    return (
        <form onSubmit={handleSubmit}>  
            <h2>Booking Form</h2>
            <input name="customerName" placeholder="Customer Name" onChange={handleChange} required />
            <input name="customerEmail" type="email" placeholder="Customer Email" onChange={handleChange} required />
            <input name="bookingDate" type="date" onChange={handleChange} required />
            <select name="bookingType" onChange={handleChange} required>
                <option value="">Select Booking Type</option>
                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>
                <option value="Custom">Custom</option>
            </select>
            {form.bookingType === 'Half Day' && (
                <select name="bookingSlot" onChange={handleChange} required>
                    <option value="">Select Slot</option>
                    <option value="First Half">First Half</option>
                    <option value="Second Half">Second Half</option>
                </select>
            )}
            {form.bookingType === 'Custom' && (
                <input name="bookingTime" type="time" onChange={handleChange} required />
            )}
            <button type="submit">Book</button>
        </form>
    );
};

export default BookingForm;
