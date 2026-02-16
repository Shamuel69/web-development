import React, { useState } from "react";
import mail from '../../assets/mail.svg';
import lock from '../../assets/login-password.svg';
import '../css/signin.css';
import { Link } from "react-router-dom";
function storeemail() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }else{
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        alert("Account created successfully!");
        
    }
}
    
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <div className="signin-container">
            <div className="signin-inner-container">
                <h2>Sign Up</h2>
                <form className="signin-form" onSubmit={storeemail}>
                    <div className="email-container">
                        <div className="text-container">
                            <img src={mail} alt="Email Icon" className="input-icon" />
                            <label htmlFor="email">Email:</label>
                        </div>
                        <input type="email" id="email" name="email" placeholder="example@gmail.com" required />
                    </div>
                    <div className="password-container">
                        <div className="text-container">
                            <img src={lock} alt="Password Icon" className="input-icon" />
                            <label htmlFor="password">Password:</label>
                        </div>
                        <input type="password" id="password" name="password" placeholder="Password@123" required />
                    </div>
                    <div className="password-container">
                        <div className="text-container">
                            <img src={lock} alt="Password Icon" className="input-icon" />
                            <label htmlFor="confirm-password">Confirm Password:</label>
                        </div>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Password@123" required />
                        
                    </div>
                    <div className="options-container">
                        <p className="forgot-password">Already have an account? <Link to="/signin">Sign In!</Link></p>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;