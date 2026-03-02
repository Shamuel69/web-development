import React, { useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";


import mail from '../../assets/mail.svg';
import lock from '../../assets/login-password.svg';
import '../css/signin.css';



function Signin() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!loginInput || !password) {
            setError('Please fill in all fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (loginInput.includes('@')) {
            if (!emailRegex.test(loginInput)) {
                setError('Please enter a valid email address.');
                return;
            }
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        
        setLoading(true);
        setTimeout(() => {
            const userData = { 
                email: loginInput,
                name: loginInput.split('@')[0], 
                loginTime: new Date().toISOString()
            };

            login(userData);
            setLoading(false);
            navigate('/');
        }, 500);
    };

    return (
        <div className="signin-container">
            <div className="signin-inner-container">
                <h2>Sign In</h2>

                {error && <p className="error-message">{error}</p>}
                
                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="email-container">
                        <div className="text-container">
                            <img src={mail} alt="Email Icon" className="input-icon" />
                            <label htmlFor="email">Email:</label>
                        </div>
                        <input type="text" id="login" name="login" placeholder="example@gmail.com" value={loginInput} required onChange={(e) => setLoginInput(e.target.value)} />
                    </div>
                    <div className="password-container">
                        <div className="text-container">
                            <img src={lock} alt="Password Icon" className="input-icon" />
                            <label htmlFor="password">Password:</label>
                        </div>
                        <input type="password" id="password" name="password" placeholder="Password@123" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="options-container">
                        <p className="forgot-password">Forgot Password? <Link to="/forgotpassword">Click here!</Link></p>
                        <p className="forgot-password">Don't have an account? <Link to="/signup">Sign Up!</Link></p>
                    </div>
                    <button type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
                </form>
            </div>
        </div>
    );
}

export default Signin;