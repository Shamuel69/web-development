import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

function Contact() {
    return (
        <div>
            <h1>Contact Page</h1>
            <p>This is the Contact page.</p>
            <nav>
                <p>go back </p><Link to="/">Home</Link>
            </nav>
        </div>
    );
}
export default Contact;