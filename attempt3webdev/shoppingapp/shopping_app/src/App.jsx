import { useState } from 'react'
import profile from './assets/profile-icon.svg'
import Search from './assets/search-icon.svg'
import shoppingCart from './assets/shopping-cart.svg'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'

function App() {
  const [isshown, setIsShown] = useState(false);

  return (
    <>
      <div className="App">
        <div className="App-header">
          <div className="App-title-container">
            <h2>Shopping App</h2>
            <div className="search-bar" style={{cursor: 'pointer'}}>
              <img src={Search} alt="Search" onClick={() => setIsShown(!isshown)} />
              <input className={`search-bar-header ${isshown ? 'show' : ''}`} type="text" placeholder="Search..."/>
            </div>
          </div>
          {/* <div className="App-title-container">
            <Link to="/"><h2>Home</h2></Link>
            <Link to="/about"><h2>About</h2></Link>
            <Link to="/contact"><h2>Contact</h2></Link>
          </div> */}
          <div className="App-title-container">
            <div className="App-profile">
              <img src={profile} alt="Profile" />
              <h4>Sign In</h4>
            </div>
            <img className="App-cart" src={shoppingCart} alt="Cart" />
          </div>
        </div>
        <div className="App-menu">
        
          <Link to="/">Jewels</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        
        </div>
      </div>
    </>
  )
}

export default App
