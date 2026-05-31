import React, { useState, useEffect, useRef, useContext } from 'react'

import './css/signin.css';

import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const { error, signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error1, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password || !email) {
            setError('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        const userData = {
            username: username,
            email: email,
            password: password,
        }
        signup(userData);
        navigate('/');
    }

    return (
        <div className="signin-container">
            <div className="signin-form">
                <h2>Sign Up</h2>
                {error1 && <p className="error-message">{error1}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div classname="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div classname="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div classname="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>
                    <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup