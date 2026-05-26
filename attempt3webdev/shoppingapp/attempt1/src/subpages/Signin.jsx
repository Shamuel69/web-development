import react, { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import './css/signin.css';

function Signin() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sign in button clicked');
        
    }

    return (
        <>
        <div className="signin-container">
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Sign in</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
        </>
    );
}

export default Signin;