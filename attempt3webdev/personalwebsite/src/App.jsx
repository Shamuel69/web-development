import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import './App.css'
import AboutMe from './infopages/aboutme.jsx'; 

import LightMode from './assets/sun_with_clouds.png'
import DarkMode from './assets/crescent_moon.png'
import closedBook from './assets/closed_book.svg'
import openedBook from './assets/opened_book.svg'
import controller from './assets/game-controller.svg'
import computer from './assets/computer.svg'
import toolbox from './assets/tool-box.svg'
import lalacat from './assets/lalacat.jpg'

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BikeProduct() {
  return (
    <div>
      <h1>Bike Product Page</h1>
      <p>This is the Bike Product page.</p>
    </div>
  );
}
function Home() {
  return (
    <div className="inside-content">
        <div className="big_banner">
          <h1>Welcome to my personal website!</h1>
        </div>
        <h2>The date because im not good with it: {formatDate(new Date())}</h2>
        
        <div className="intro-text">
          <img src={lalacat} className="lalacat-image" alt="cute cat with a flower crown"/>

          <div className="spacer-horizontal">
            <h2 className="intro-title">Hi! I'm Sam</h2>
            <h3 className="intro-description">A budding software developer, a tech enthusiast, and the guy you want making your next website.
               This website you get to learn what I'm all about and my developing skills in web design along with projects I've worked on.</h3>
          </div>
        </div>
        
        {/* do that menu thing here */}
        <div className="to-know-about-me">
          <div className="to-know-about-me-title">
            <h2 className="to-know-about-me-header">To know more about me:</h2>
            <div className="icon-containers">
              <div className="subject-box">
                <img src={controller} className="subject-icon" alt="controller icon"/>
                <h3>Interests</h3>
              </div>
              <div className="subject-box">
                <img src={computer} className="subject-icon" alt="computer icon"/>
                <h3>Skills</h3>
              </div>
              <div className="subject-box">
                <img src={toolbox} className='subject-icon' alt="toolbox icon"/>
                <h3>Hobbies</h3>
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const iconSrc = darkMode ? LightMode : DarkMode;
  
  const [IsOpen, setIsOpen] = useState(false);
  const bookiconSrc = IsOpen ? openedBook : closedBook;
  
  React.useEffect(() => {
    document.body.classList.toggle('lightMode', darkMode);
  }, [darkMode]);
  return (
    <div className="app">
      <div className={`text-header-container ${darkMode ? "dark" : "light"}`} style={{borderBottom: '2px solid white'}}>
        <div className="text-header">
          <h1>Personal Website</h1>
          <img src={iconSrc} className={`logo ${darkMode ? "dark" : "light"}`} alt="light/dark toggle" 
            onClick={() => setDarkMode(!darkMode)} style={{cursor: 'pointer'}}/>
        </div>  
      <div className={`sidebar ${darkMode ? "light" : ""} ${IsOpen ? "active" : ""}`}>
        <div className="sidebar-icon-container">
          <img src={bookiconSrc} className="book-icon" alt="toggle open and close sidebar"
            onClick={() => setIsOpen(!IsOpen)} style={{cursor: 'pointer'}}/>
        </div>
        <div className={`ease-in-out ${darkMode ? "light" : ""} ${IsOpen ? "active" : ""}`}>
          <p>status: {IsOpen ? 'active' : 'closed'}</p>
          <h2>Sidebar</h2>
          <h1>ghghg</h1>
          <div className="directory-links" >
            <nav className="nav-links">
              <p><Link to="/">Home</Link></p>
              <p><Link to="/aboutme">About Me</Link></p>
              <p><Link to="/projects">Projects</Link></p>
              <p><Link to="/contact">Contact</Link></p>
            </nav>
          </div>
        </div>
        
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bikeproduct" element={<BikeProduct />} />
          <Route path="/aboutme" element={<AboutMe />} />
        </Routes>
      </div>
    </div>
    
  )
}

export default App
