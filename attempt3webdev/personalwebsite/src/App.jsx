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
      <div className="text-header-container" style={{position: "absolute", left: 0}}>
        <header className="header" style={{}}>
          <h1>Personal Website</h1>
          <img src={iconSrc} className="logo" alt="light/dark toggle" 
            onClick={() => setDarkMode(!darkMode)} style={{cursor: 'pointer'}}/>
        </header>
      </div>
      <div className="sidebar">
        <button onClick={() => setIsOpen(!IsOpen)}> close/open </button>
        <h2>Sidebar</h2>
      </div>
      <div className="inside-content">
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
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
