import React, { useState, useEffect, useRef, useContext } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import profile from './assets/profile-icon.svg'
import Search from './assets/search-icon.svg'
import shoppingCart from './assets/shopping-cart.svg'

import './App.css'
import './subpages/css/cartoverlay.css'

import Home from './subpages/Home.jsx'
import BestDeals from './subpages/BestDeals.jsx'
import Inventory from './subpages/Inventory.jsx'
import Contact from './subpages/infopages/Contact.jsx'
import Signin from './subpages/infopages/Signin.jsx'
import Signup from './subpages/infopages/Signup.jsx'
import Forgotpassword from './subpages/infopages/Forgotpassword.jsx'
import InventoryItem from './subpages/InventoryItem.jsx';



function BottomCredits() {
  return (
    <div className="bottom-credits">
      <p>© 2026 Shopping App. All rights reserved.</p>
    </div>
  );
}

function CartOverlay( { isCartOverlay, user, login, onClose } ) {
  const logerin = login;

  return (
    // Make these:

    // Cart items - Each item shows image, name, price, quantity controls, remove button
    // Quantity controls - +/- buttons to adjust amounts
    // Summary - Subtotal, shipping, tax, total
    // Action buttons - Continue shopping, checkout
    // Close button - Easy way to close the overlay
    // Scrollable - For when cart has many items
    
    <div className={`cart-overlay ${isCartOverlay ? 'clicked' : ''}`} onClick={onClose}>
      <div className={`cart-overlay-content ${isCartOverlay ? 'clicked' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="cart-overlay-container">
          <h2 >{user ? user.name : "Guest"}</h2>

          <h4>plans to use login function but its under development</h4>
          <h2>Cart</h2>
          <p>This is a demo app. Cart functionality is not implemented.</p>
          
        </div>
        <button onClick={() => logerin()}>Login</button>
        
      </div>
    </div>

  )
}


function Profile( { isClicked , user, handleLogout} ) {
  return (
    user ? (
      <div className={`profile-dropdown-list ${isClicked ? 'clicked' : ''}`}>
        <div className="profile-dropdown-list-header">
          <img src={profile} alt="profile"/>
          <h4>{user.name}</h4>
        </div>
        <div className="profile-dropdown-list-buttons">
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/cartcheckout/recipts">Orders</Link></li>
            <li><Link to="/cartcheckout">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          
        </div>
        <div className="profile-dropdown-list-buttons">
          <button onClick={handleLogout}>Logout</button>
          
        </div>
      </div>
    ) :
    (
      <div className={`profile-dropdown-list ${isClicked ? 'clicked' : ''}`}>
        <div className="profile-dropdown-list-header">
          <img src={profile} alt="profile"/>
          <h4>Guest</h4>
          
        </div>
        <div className="profile-dropdown-list-buttons">
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
          
        </div>
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
  const [isCartOverlay, setIsCartOverlay] = useState(false);
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
        setIsClicked(false);
      } else {
        console.log('scrolled up');
        setIsShrunk(false);
        setIsClicked(false);
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
              <div className={`App-title-container ${isShrunk ? 'shrink' : ''}`}>
                <h2><Link to="/" className="App-title">Shopping App</Link></h2>
                <div className="search-bar" style={{cursor: 'pointer'}}>
                  <img src={Search} alt="Search" onClick={() => setIsShown(!isshown)}/>
                  <input className={`search-bar-header ${isshown ? 'show' : ''}`} type="text" placeholder="Search..."/>
                </div>
              </div>
              
              <div className="App-title-container">
                <div className={`App-profile ${isShrunk ? 'shrink' : ''} ${isClicked ? 'clicked' : ''}`} onClick={(e) => {e.stopPropagation(); setIsClicked(prev => !prev)}}>
                  {user ? (
                      <div className="profile-dropdown">
                        <div className="profile-container">
                          <img src={profile} alt="Profile" />
                          <p>Welcome, {user.name}!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="profile-dropdown">
                        <div className="profile-container">
                          <img src={profile} alt="Profile" />
                          <p>this is test variable</p>
                        </div>
                      </div>
                    )
                  }
                  <Profile isClicked={isClicked} user={user} handleLogout={handleLogout}/>                             
                </div>
                <div className={`App-cart-container ${isShrunk ? 'shrink' : ''}`}>
                  <img className="App-cart" src={shoppingCart} alt="Cart" onClick={() => setIsCartOverlay(true)}/>
                  <CartOverlay isCartOverlay={isCartOverlay} user={user} login={handleLogout} onClose={() => setIsCartOverlay(false)} />
                </div>
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
            <Route path="/inventory/:id" element={<InventoryItem />} />
            <Route path="/inventory/:tag?" element={<Inventory />} />
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
