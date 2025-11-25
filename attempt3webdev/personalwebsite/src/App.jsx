import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import './App.css'
import './infopages/aboutme.jsx'

import LightMode from './assets/sun_with_clouds.png'
import DarkMode from './assets/crescent_moon.png'
import closedBook from './assets/closed_book.svg'
import openedBook from './assets/opened_book.svg'
import controller from './assets/game-controller.svg'
import computer from './assets/computer.svg'
import toolbox from './assets/tool-box.svg'

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}



function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false);

  const iconSrc = darkMode ? LightMode : DarkMode;
  
  const [IsOpen, setIsOpen] = useState(false);
  const bookiconSrc = IsOpen ? openedBook : closedBook;
  
  React.useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#333' : '#271a26ff';
  }, [darkMode]);
  return (
    <div className="app">
      <div className="text-header-container" style={{borderBottom: '2px solid white'}}>
        <h1>Personal Website</h1>
        <img src={iconSrc} className={`logo ${darkMode ? "dark" : "light"}`} alt="light/dark toggle" 
          onClick={() => setDarkMode(!darkMode)} style={{cursor: 'pointer'}}/>
      <div className={`sidebar ${IsOpen ? "active" : ""}`}>
        <div className="sidebar-icon-container">
          <img src={bookiconSrc} className="book-icon" alt="toggle open and close sidebar"
            onClick={() => setIsOpen(!IsOpen)} style={{cursor: 'pointer'}}/>
        </div>
        <div className={`ease-in-out ${IsOpen ? "active" : ""}`}>
          <p>status: {IsOpen ? 'active' : 'closed'}</p>
          <h2>Sidebar</h2>
          <h1>ghghg</h1>
          <div className="directory-links" >
            <p>bling bling</p>
            <p><Link to="/infopages/aboutme">About Me</Link></p>
            <ul className="links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="/infopages/aboutme">About Me</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        
      </div>
      </div>
      <div className="inside-content" style={{width: '60%'}}>
        <div className="big_banner">
          <h1>Welcome to my personal website!</h1>
        </div>
        
        <h2>The date if you missed it: {formatDate(new Date())}</h2>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        {/* do that menu thing here */}
        <div className="to-know-about-me">
          <h2>Things to know about me:</h2>
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
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
