import React from "react";
import mail from '../../assets/mail.svg';
import '../css/signin.css';
import { Link } from "react-router-dom";

function Forgotpassword() {
    return (
        <div className="signin-container">
            <div className="signin-inner-container">
                <h2>Forgot Password</h2>
                <form className="signin-form">
                    <div className="email-container">
                        <div className="text-container">
                            <img src={mail} alt="Email Icon" className="input-icon" />
                            <label htmlFor="email">Send recovery email:</label>
                        </div>
                        <input type="email" id="email" name="email" placeholder="example@gmail.com" required />
                    </div>
                    
                    <div className="options-container">
                        <p className="forgot-password">Don't have an account? <Link to="/signup">Sign Up!</Link></p>
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default Forgotpassword;