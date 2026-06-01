import react, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import './css/signin.css';

function Signin() {
    const { error, login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            useNavigate('/');
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
            useNavigate('/');
        }, 500);
    }

    return (
        <>
        <div className="signin-container">
            <h1>Sign in</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" onClick={handleSubmit}>Sign in</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
        </>
    );
}

export default Signin;