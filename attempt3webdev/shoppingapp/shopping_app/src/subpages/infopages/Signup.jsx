import React, { useState, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import mail from '../../assets/mail.svg';
import lock from '../../assets/login-password.svg';
import '../css/signin.css';
    
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const { login } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = emailRegex.test(email);

        if (!isValid) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (name.length > 20) {
            setError('Name must be less than 20 characters.');
            return;
        }
        if (password.toLowerCase() === 'password' || password.toLowerCase() === '123456' || password.toLowerCase() === '12345678') {
            setError('Please choose a stronger password.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const userData = {
                email: email,
                name: name,
                loginTime: new Date().toISOString()
            };
            login(userData);
            setLoading(false);
            navigate('/');
        }, 500);

        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        alert("Account created successfully!");
    };

    return (
        <div className="signin-container">
            <div className="signin-inner-container">
                <h2>Sign Up</h2>
                
                {error && <p className="error-message">{error}</p>}

                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="name-container">
                        <div className="text-container">
                            <img src={mail} alt="Name Icon" className="input-icon" />
                            <label htmlFor="username">Username:</label>
                        </div>
                        <input type="text" id="username" name="username" placeholder="JohnDoe123" value={name} required onChange={(e) => setName(e.target.value)} />
                    </div>
                   
                    <div className="email-container">
                        <div className="text-container">
                            <img src={mail} alt="Email Icon" className="input-icon" />
                            <label htmlFor="email">Email:</label>
                        </div>
                        <input type="email" id="email" name="email" placeholder="example@gmail.com" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="password-container">
                        <div className="text-container">
                            <img src={lock} alt="Password Icon" className="input-icon" />
                            <label htmlFor="password">Password:</label>
                        </div>
                        <input type="password" id="password" name="password" placeholder="Password@123" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="password-container">
                        <div className="text-container">
                            <img src={lock} alt="Password Icon" className="input-icon" />
                            <label htmlFor="confirm-password">Confirm Password:</label>
                        </div>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Password@123" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div className="options-container">
                        <p className="forgot-password">Already have an account? <Link to="/signin">Sign In!</Link></p>
                    </div>
                    <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;