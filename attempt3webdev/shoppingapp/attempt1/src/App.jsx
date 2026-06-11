import React, { useState, useEffect, useRef, useContext } from 'react'
import menu from './assets/burger-menu-black-lines.svg'
import search from './assets/search-icon.svg'
import { AuthContext } from './context/AuthContext';
import { InventoryContext } from './context/InventoryContext';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Signup from './subpages/Signup.jsx'
import Signin from './subpages/Signin.jsx'
import Collections from './subpages/Collections.jsx'
import { Inventory, GetQuick, FrontPageItems, HotItems } from './subpages/Inventory.jsx'
import Placeholder from './subpages/Placeholder.jsx'
import './App.css'


function Home() {
    const { inventory } = useContext(InventoryContext);
    return (
        <div>
            <GetQuick inventory={inventory}/>
            <HotItems inventory={inventory} vertical={false}/>
            <FrontPageItems inventory={inventory}/>
        </div>
    )
}

function SideMenu({ activeMenu, setActiveMenu, user, profiles }) {
    return (
        <div className={`background-blur ${activeMenu ? "active" : ""}`} onClick={() => setActiveMenu(false)} >
            <div className={`side-menu ${activeMenu ? "active" : ""}`} onClick={(e) => e.stopPropagation()} >
                <div className="close-button" onClick={() => setActiveMenu(false)}  >
                    <h1 className="close-icon">&times;</h1>
                </div>
                <h3>Menu</h3>
                <p>{user ? user.username : profiles[0] ? profiles[0].username : profiles}</p>
                <ul>
                    <li><Link to="/shop">Shop</Link></li>
                    <li>Collections</li>
                    <li>My Collections</li>
                    <li>Wishlist</li>
                    <li>Cart</li>
                    <li>Contact Us</li>
                </ul>
            </div>

        </div>
    )
}

function ProfileMenu({ user, logout, active}) {
    return (
        <div className="profile-container" style={{ display: active ? 'block' : 'none', opacity: active ? 1 : 0, transition: 'opacity 0.3s ease-in-out', }}>
            <div className="profile-menu">
                {user ? (
                    <>
                        {/* please add a profile image for the user */}
                        <img src={search} alt="profile image" />
                        <h3>{user.username}</h3>
                        <div className="profile-dropdown">
                            <div className="profile-dropdown-list">
                                <ul>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/cartcheckout/recipts">Orders</Link></li>
                                    <li><Link to="/cartcheckout">Cart</Link></li>
                                    <li><Link to="/wishlist">Wishlist</Link></li>
                                    <li><Link to="/checkout">Checkout</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li onClick ={() => logout()}><Link to="/">Logout</Link></li>
                                </ul>
                            </div>
                        </div> 
                        
                    </>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/signin">Login</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

function App() {
    const [activeMenu, setActiveMenu] = useState(false);
    const [activeDropdownMenu, setActiveDropdownMenu] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const displayRef = useRef(null);
    const lastScroll = useRef(0);
    const { user, profiles, logout } = useContext(AuthContext);

    useEffect(() => {
        const el = displayRef.current;
        if (!el) return console.error("displayRef is not attached to an element");
        const handleScroll = () => {
            if (el.scrollTop > lastScroll.current) {
                setScrolling(true);
                console.log(`display scrollTop: ${el.scrollTop}, lastScroll: ${lastScroll.current}`);
                
            } else {
                setScrolling(false);
            }
            lastScroll.current = el.scrollTop;
        }
    
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
        }, []);
    return (
        <>
        <section id="header">
            <div className={`header-content ${scrolling ? "active" : ""}`}>
                <h2 className="header-title"><Link to="/" className="ignore-element">CarlShop</Link></h2>
                <div className="header-container">
                    <div className="header-links">
                        <h3 className="bare-element"><Link to="/shop" className="ignore-element">Shop</Link></h3> 
                        <h3 className="disposable-element"><Link to="/collections" className="ignore-element">Collections</Link></h3> {/* thinkin this could be perfect for a playlist maker */} 
                        <h3 className="disposable-element">Best Deals</h3>
                        
                    </div>
                </div>
                <div className="header-container">
                    <div className="searchbar">
                        <input type="text" placeholder="Search for products, collections, and more" />
                        <img src={search} alt="search icon" className="search-icon" />
                    </div>
                </div>
                <div className="header-container">
                    <div className="profiles">
                        {user ? (
                        <>
                            {/* please add a profile image for the user */}
                            <div className="base-profile-container" onClick={() => setActiveDropdownMenu(prevState => !prevState)} >
                                <img src={search} alt="profile image" /> 
                                <h3>{user.username}</h3>
                            </div>
                            <ProfileMenu user={user} profiles={profiles} logout={logout} active={activeDropdownMenu} />
                        </>
                        ) : (
                        <div className="auth-buttons">
                            <Link to="/signup">Sign Up</Link>
                            <Link to="/signin">Login</Link>
                        </div>
                        )}
                    </div>
                    <img src={menu} alt="menu icon" onClick={() => setActiveMenu(prevState => !prevState)}/>
                </div>
            </div>
        </section>

        <section id="menu-overlay">
            <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={user} profiles={profiles} />
        </section>
        
        <section id="display-area" ref={displayRef}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Inventory />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/best-deals" element={<Placeholder />} />
                <Route path="/my-collections" element={<Placeholder />} />
                <Route path="/wishlist" element={<Placeholder />} />
                <Route path="/cart" element={<Placeholder />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact-us" element={<Placeholder />} />
            </Routes>
        </section>
        
        <section id="spacer"></section>
        </>
    )
}

export default App
