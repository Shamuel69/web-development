import { useState } from 'react'
import profile from './assets/profile-icon.svg'
import Search from './assets/search-icon.svg'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'

function App() {
  const [isshown, setIsShown] = useState(false);
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <div className="App-header">
          <h2>Shopping App</h2>
          <div className="App-profile">
            <img src={profile} alt="Profile" />
            <h4>Sign In</h4>
          </div>
          <div className="search-bar">
            <img src={Search} alt="Search" onClick={() => setIsShown(!isshown)} />
            <input hidden={!isshown} type="text" placeholder="Search..."/>
          </div>
        </div>
        <div className="App-menu">to be added: contacts, cart, checkout, deals, recent adds</div>
      </div>

      <h1>Vite + React</h1>
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
