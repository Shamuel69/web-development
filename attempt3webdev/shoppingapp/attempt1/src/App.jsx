import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { Routes, Route, Link, useLocation } from 'react-router-dom';

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
    const [count, setCount] = useState(0);
    const [loggedin, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [activeMenu, setActiveMenu] = useState('');
    const [scrolling, setScrolling] = useState(false);

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
            <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            </div>
        </section>

        <section id="display-area">

        </section>
        
        
        <section id="spacer"></section>
        </>
    )
}

export default App
