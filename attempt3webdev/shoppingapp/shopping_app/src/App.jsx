import React, { useState, useContext } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import profile from './assets/profile-icon.svg'
import Search from './assets/search-icon.svg'
import shoppingCart from './assets/shopping-cart.svg'
import './App.css'

import Home from './subpages/Home.jsx'
import BestDeals from './subpages/BestDeals.jsx'
import Inventory from './subpages/Inventory.jsx'
import Contact from './subpages/infopages/Contact.jsx'
import Signin from './subpages/infopages/Signin.jsx'
import Signup from './subpages/infopages/Signup.jsx'
import Forgotpassword from './subpages/infopages/Forgotpassword.jsx'



function BottomCredits() {
  return (
    <div className="bottom-credits">
      <p>© 2026 Shopping App. All rights reserved.</p>
    </div>
  );
}

function App() {
  const [isshown, setIsShown] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const hidetopbar = location.pathname === '/signin' || location.pathname === '/contact' || location.pathname === '/signup' || location.pathname === '/forgotpassword';
  
  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <div className="App">
        {!hidetopbar && (
          <>
            <div className="App-header">
              <div className="App-title-container">
                <h2><Link to="/" className="App-title">Shopping App</Link></h2>
                <div className="search-bar" style={{cursor: 'pointer'}}>
                  <img src={Search} alt="Search" onClick={() => setIsShown(!isshown)}/>
                  <input className={`search-bar-header ${isshown ? 'show' : ''}`} type="text" placeholder="Search..."/>
                </div>
              </div>
              
              <div className="App-title-container">
                <div className="App-profile">
                  <img src={profile} alt="Profile" />
                  <h4><Link to="/signin">Sign In</Link></h4>
                </div>
                <img className="App-cart" src={shoppingCart} alt="Cart" />
              </div>
            </div>
            <div className="App-menu">
              
              <Link to="/">Jewels</Link>
              <Link to="/bestdeals">Best Deals</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </>

        )}
        <div className="display-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bestdeals" element={<BestDeals />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
          </Routes>
        </div>
        {!hidetopbar && <BottomCredits />}
      </div>
    </>
  )
}

export default App
