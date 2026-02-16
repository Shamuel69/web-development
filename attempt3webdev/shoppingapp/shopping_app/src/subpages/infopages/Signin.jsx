import React from "react";
import mail from '../../assets/mail.svg';
import lock from '../../assets/login-password.svg';
import '../css/signin.css';
import { Link } from "react-router-dom";

function Signin() {
    return (
        <div className="signin-container">
            <div className="signin-inner-container">
                <h2>Sign In</h2>
                <form className="signin-form">
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
                    <div className="options-container">
                        <p className="forgot-password">Forgot Password? <Link to="/forgotpassword">Click here!</Link></p>
                        <p className="forgot-password">Don't have an account? <Link to="/signup">Sign Up!</Link></p>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Signin;