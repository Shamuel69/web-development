import React, { useState, useEffect, useRef, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { Routes, Route, Link, useLocation } from 'react-router-dom';


import Signin from './subpages/Signin.jsx'
import Placeholder from './subpages/Placeholder.jsx'
import './App.css'

function SideMenu({ activeMenu, setActiveMenu }) {
    return (
        <div className={`side-menu ${activeMenu === 'open' ? 'open' : ''}`}>
            <h3>Menu</h3>
            <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>Collections</li>
                <li>Best Deals</li>
                <li>Contact Us</li>
            </ul>
        </div>
    )
}

function App() {
    const [loggedin, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [activeMenu, setActiveMenu] = useState('');
    const [scrolling, setScrolling] = useState(false);
    const displayRef = useRef(null);
    const lastScroll = useRef(0);
    useEffect(() => {
        const handleScroll = () => {
            if (el.scrollTop > lastScroll.current) {
                setScrolling(true);
                console.log(`display scrollTop: ${el.scrollTop}, lastScroll: ${lastScroll.current}`);
                
            } else {
                setScrolling(false);
            }
            lastScroll.current = el.scrollTop;
        }
    
        const el = displayRef.current;
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
        }, []);
    return (
        <>
        <section id="header">
            <div className={`header-content ${scrolling ? "active" : ""}`}>
                <h2 className="header-title">CarlShop</h2>
                <h3 className="bare-element">Shop</h3>
                <h3 className="bare-element">Collections</h3> {/* thinkin this could be perfect for a playlist maker */}
                
                <h3 className="best-deals">Best Deals</h3>

                <div className="profiles">
                    {loggedin ? (
                    <>
                        {/* please add a profile image for the user */}
                        <img src={viteLogo} alt="profile image" /> 
                        <h3>{username}</h3>
                    </>
                    ) : (
                    <div className="auth-buttons">
                        <button>Sign Up</button>
                        <button>Login</button>
                    </div>
                    )}
                </div>
                <img src={reactLogo} alt="menu icon" onClick={() => setActiveMenu(activeMenu === 'open' ? '' : 'open')}/>
            </div>
        </section>
        <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        
        <section id="display-area">
            <Routes>
                <Route path="/" element={<Placeholder />} />
                <Route path="/shop" element={<Placeholder />} />
                <Route path="/collections" element={<Placeholder />} />
                <Route path="/best-deals" element={<Placeholder />} />
                <Route path="/contact-us" element={<Placeholder />} />
            </Routes>
        </section>
        
        <section id="spacer"></section>
        </>
    )
}

export default App
