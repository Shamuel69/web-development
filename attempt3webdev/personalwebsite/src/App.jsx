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
  const [bgColor, setBgColor] = useState(darkMode ? '#333' : '#fff');
  
  document.body.style.backgroundColor = bgColor;

  React.useEffect(() => {
    setBgColor(darkMode ? '#333' : '#fff');
  }, [darkMode]);
  return (
    <>
      <div className="header">
        
        <h1>Personal Website</h1>
        <img src={iconSrc} className="logo" alt="light/dark toggle" 
          onClick={() => setDarkMode(!darkMode)} style={{cursor: 'pointer'}}/>
      </div>
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
    </>
  )
}

export default App
