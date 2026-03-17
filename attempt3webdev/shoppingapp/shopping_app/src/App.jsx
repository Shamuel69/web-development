import React, { useState, useEffect, useRef, useContext } from 'react'
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

function Profile( { isClicked , user, handleLogout} ) {
  return (
    user ? (
      <div className={`profile-dropdown-list ${isClicked ? 'clicked' : ''}`}>
        <img src={profile} alt="profile"/>
        <h4>{user.name}</h4>
        <button onClick={handleLogout}>Logout</button>
      </div>
    ) :
    (
      <div className={`profile-dropdown-list ${isClicked ? 'clicked' : ''}`}>
      <img src={profile} alt="profile"/>
      <h4>Guest</h4>
      <button><Link to="/signin">Sign In</Link></button>
      <button><Link to="/signup">Sign Up</Link></button>
    </div>
    )
  )
}
function App() {
  const [isshown, setIsShown] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const hidetopbar = location.pathname === '/signin' || location.pathname === '/contact' || location.pathname === '/signup' || location.pathname === '/forgotpassword';
  const [isClicked, setIsClicked] = useState(false);
  const displayRef = useRef(null);
  const lastScroll = useRef(0);
  const [isShrunk, setIsShrunk] = useState(false); 
  const handleLogout = () => {
    logout();
  }
  
  useEffect(() => {
    const handleScroll = () => {
      if (el.scrollTop > lastScroll.current) {
        console.log('scrolled down');
        setIsShrunk(true);
      } else {
        console.log('scrolled up');
        setIsShrunk(false);
      }
      lastScroll.current = el.scrollTop;
    };

    const el = displayRef.current;
    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="App">
        {!hidetopbar && (
          <>
            <div className={`App-header ${isShrunk ? 'shrink' : ''} `}>
              <div className="App-title-container">
                <h2><Link to="/" className="App-title">Shopping App</Link></h2>
                <div className="search-bar" style={{cursor: 'pointer'}}>
                  <img src={Search} alt="Search" onClick={() => setIsShown(!isshown)}/>
                  <input className={`search-bar-header ${isshown ? 'show' : ''}`} type="text" placeholder="Search..."/>
                </div>
              </div>
              
              <div className="App-title-container">
                <div className={`App-profile ${isShrunk ? 'shrink' : ''} ${isClicked ? 'clicked' : ''}`} onClick={() => setIsClicked(!isClicked)}>
                  {user ? (
                      <div className="profile-dropdown">
                        <div className="profile-container">
                          <img src={profile} alt="Profile" />
                          <p>Welcome, {user.name}!</p>
                        </div>
                        <Profile isClicked={isClicked} user={user} handleLogout={handleLogout}/>                       
                      </div>
                    ) : (
                      <div className="profile-dropdown">
                        <div className="profile-container">
                          <img src={profile} alt="Profile" />
                          <p>this is test variable</p>
                        </div>
                        <Profile isClicked={isClicked} user={user}/>
                      </div>
                    )
                  }
                </div>
                <img className="App-cart" src={shoppingCart} alt="Cart" />
              </div>
            </div>
            <div className="App-menu-container" >
              <div className={`App-menu ${isShrunk ? 'shrink' : ''}`}>
                <Link to="/">Jewels</Link>
                <Link to="/bestdeals">Best Deals</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
          </>

        )}
        <div className="display-area" ref={displayRef}>
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
console.log("App rendered");
export default App
