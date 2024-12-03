import React, { useState } from 'react';
import { signup } from '../../services/api';

const Signup = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signup(form);
            setMessage(data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error signing up');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input name="firstName" type='text' placeholder="First Name" onChange={handleChange} required />
                <input name="lastName" type='text' placeholder="Last Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
