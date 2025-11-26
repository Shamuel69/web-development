import React from "react";
import { Routes, Route, Link } from 'react-router-dom';



function AboutMe() {
  return (
    <div>
      <h1>About Me</h1>
      <p>This is the About Me page.</p>
      {/* <Routes>
        <Route path="/" element={<Home />} />
      </Routes> */}
      <nav>
        <p>go back </p><Link to="/">Home</Link>
      </nav>
    </div>
);
}
export default AboutMe

// ------------------------------------------------------------------------------
// The following is from App.jsx for context
// ------------------------------------------------------------------------------