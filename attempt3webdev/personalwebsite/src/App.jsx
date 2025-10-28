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
        <button onClick={() => setIsOpen(!IsOpen)}> close/open </button>
        <h2>Sidebar</h2>
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
          <div class="scroll-row-of-interests" style={{background: 'rgba(255, 255, 255, 0.1)',}}>
            <div class="interest-item">
              <p></p>Programming
              </div>
            <div class="interest-item">
              Gaming
              <p>During my free time, I really like playing games! 
                When my friends are free, we usually play <i>Call of Duty: Zombies</i> and <i>Minecraft</i>.
                On my own time, I usually play <i>Skyrim</i> or <i></i></p>
              </div>
            <div class="interest-item">
              Cooking
              <p></p>
            </div>
            <div class="interest-item">
              Nature
              <p></p>
            </div>
            <div class="interest-item">
              Engineering
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
