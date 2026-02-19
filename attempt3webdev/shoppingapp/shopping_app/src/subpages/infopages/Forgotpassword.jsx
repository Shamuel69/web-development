import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mail from '../../assets/mail.svg';
import '../css/signin.css';

function Forgotpassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess('Password reset email sent successfully! Check your inbox.');

            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        }, 1000);
    };

    return (
        <div className="signin-container">
            <div className="signin-inner-container">
                <h2>Forgot Password</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="email-container">
                        <div className="text-container">
                            <img src={mail} alt="Email Icon" className="input-icon" />
                            <label htmlFor="email">Send recovery email:</label>
                        </div>
                        <input type="email" id="email" name="email" placeholder="example@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    
                    <div className="options-container">
                        <p className="forgot-password">Don't have an account? <Link to="/signup">Sign Up!</Link></p>
                    </div>
                    <button type="submit" disabled={loading}>{loading ? 'Sending Email...' : 'Reset Password'}</button>
                </form>
            </div>
        </div>
    );
}

export default Forgotpassword;