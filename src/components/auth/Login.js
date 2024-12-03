import React, { useState } from 'react';
import { login } from '../../services/api';

const Login = ({ setAuthenticated }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(form);
            localStorage.setItem('token', data.token);
            setAuthenticated(true);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error logging in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
