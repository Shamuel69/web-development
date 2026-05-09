import React, { useState, useEffect, useRef, useContext } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext2.jsx';
import { CartContext } from './context/CartContext2.jsx';

import profile from './assets/profile-icon.svg'
import Search from './assets/search-icon.svg'
import shoppingCart from './assets/shopping-cart.svg'
import ring from './assets/randoring.jpg'
import necklace from './assets/necklacemodel.jpg'
import earrings from './assets/earring.jpg'
import bracelets from './assets/bracelet.jpg'


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
  const [inventory, setInventory] = useState([]);
  const { getTotalPrice, removeFromCart, updateCartItemQuantity, cartItems } = useContext(CartContext);
  
  
  useEffect(() => {
    const fetchInventory = async() => {
      try {
        const res = await fetch('http://localhost:8080/inventory');
        const data = await res.json();
        setInventory(data.inventory); 
        
      } catch (err) {
        console.error("Error fetching inventory:", err);
      }
    }
    fetchInventory(); 
  }, []);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 5 : 0; 
  const tax = subtotal * 0.1; 
  const total = subtotal + shipping + tax;

  const itemLabels = {
    'Ring': ring,
    'Necklace': necklace,
    'Earrings': earrings,
    'Bracelets': bracelets
  }

  return (
    
    <div className={`cart-overlay ${isCartOverlay ? 'clicked' : ''}`} onClick={onClose}>
      <div className={`cart-overlay-content ${isCartOverlay ? 'clicked' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="cart-overlay-container">
          <h2 >{user ? user.name + "'s Cart" : "Guest"}</h2>
          {user ? (
            <div>
              <p>Welcome back, {user.name}!</p>
              {cartItems.length === 0 ? (
                <>
                  <p>Your cart is empty.</p>
                  <Link to="/inventory"><button>Start Shopping</button></Link>
                </>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map(cartItem => {
                      const item = inventory.find(invItem => invItem.id === cartItem.id);
                      if (!item) return null;
                      return (
                        <div key={cartItem.id} className="cart-item">
                          <img src={itemLabels[item.label]} alt={item.name} className="cart-item-image"/>
                          <div className="cart-item-details">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">${item.price}</span>
                          </div>
                          <div className="quantity-container">
                            <div className="quantity-controls">
                              <button onClick={() => updateCartItemQuantity(cartItem.id, cartItem.quantity - 1)}>-</button>
                              <input type="number" name="quantity" value={cartItem.quantity} readOnly/>
                              <button onClick={() => updateCartItemQuantity(cartItem.id, cartItem.quantity + 1)}>+</button>
                            </div>
                            <div className="cart-item-actions">
                              <span className="item-total">${item.price * cartItem.quantity}</span>
                              <button className="remove-button" onClick={() => removeFromCart(cartItem.id)}>X</button>
                            </div>
                            
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="cart-summary">
                    <div className="cart-summary-item">
                      <p>Subtotal: </p>
                      <span>${subtotal}</span>
                    </div>
                    <div className="cart-summary-item">
                      <p>Shipping: </p>
                      <span>${shipping}</span>
                    </div>
                    <div className="cart-summary-item">
                      <p>Tax: </p>
                      <span>${tax}</span>
                    </div>
                    <div className="cart-summary-total">
                      <p>Total: </p>
                      <span>${total}</span>
                    </div>
                    <Link to="/cartcheckout"><button>Checkout</button></Link>
                  </div>
                </>
              )}
            </div>

          ) : (
            <>
            <p>Please sign in to view your cart.</p>
            <button onClick={() => logerin()}>login</button>
            
            </>
          )}
        </div>
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
    logout(user);
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
