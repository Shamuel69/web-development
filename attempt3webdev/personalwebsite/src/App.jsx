import React, { useState } from 'react'
import LightMode from './assets/sun_with_clouds.png'
import DarkMode from './assets/crescent_moon.png'
import './App.css'

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

  React.useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#333' : '#271a26ff';
  }, [darkMode]);
  return (
    <div className="app">
      <div className="text-header-container" style={{borderBottom: '2px solid white'}}>
          <h1>Personal Website</h1>
          <img src={iconSrc} className="logo" alt="light/dark toggle" 
            onClick={() => setDarkMode(!darkMode)} style={{cursor: 'pointer'}}/>
      </div>
      <div className="sidebar">
        <p>status: {IsOpen ? 'open' : 'closed'}</p>
        <button onClick={() => setIsOpen(!IsOpen)}> close/open </button>
        <h2>Sidebar</h2>
        <div className="directory-links" style={{display: IsOpen ? 'block' : 'none'}}>
          <p>bling bling</p>
          <ul className="links-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
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
        <div className="to-know-about-me">
          <h2>Things to know about me:</h2>
          <div className="scroll-row-of-interests" style={{background: 'rgba(255, 255, 255, 0.1)',}}>
            <div className="interest-item">
              <h4>Programming</h4>
              <p></p>
              </div>
            <div className="interest-item">
              <h4>Gaming</h4>
              
              <p className="interest-item-text">During my free time, I really like playing games! 
                Click on the card and find out all about it.</p>
              </div>
            <div className="interest-item">
              <h4>Cooking</h4>
              <p></p>
            </div>
            <div className="interest-item">
              <h4>Nature</h4>
              <p></p>
            </div>
            <div className="interest-item">
              <h4>Engineering</h4>
              <p></p>
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
