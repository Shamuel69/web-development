import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import './css/signin.css';

function Signin() {
    const { error, login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error1, setError] = useState('');

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        console.log('Sign in button clicked');

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (username.includes('@')) {
            if (!emailRegex.test(username)) {
                setError('Please enter a valid email address.');
                return;
            }
            const userData = {
                username: username,
                password: password,
            }
            login(userData);
            navigate('/');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setTimeout(() => {
            const userData = {
                email: username,
                password: password,
            }
            login(userData);
            Link('/');
        }, 500);
    }

    return (
        <div className="signin-container">
            <div className="signin-form">
                <h2>Sign In</h2>
                {error1 && <p className="error-message">{error1}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username or Email:</label>
                        <input type="text" id="username" name="username" placeholder="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Sign In</button>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
}


export default Signin;