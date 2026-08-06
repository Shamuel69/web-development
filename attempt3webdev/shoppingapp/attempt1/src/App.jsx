import { useState, useEffect, useRef, useContext } from 'react'
import menu from './assets/burger-menu-black-lines.svg'
import search from './assets/search-icon.svg'
import { AuthContext } from './context/AuthContext';
import { InventoryContext } from './context/InventoryContext';
import { Routes, Route, Link,  } from 'react-router-dom';

import Signup from './subpages/Signup.jsx'
import Signin from './subpages/Signin.jsx'
import {Collections, LookingatCollection} from './subpages/Collections.jsx'
import { Inventory, RecentViewed, GetQuick, HeroBanner,  HotItems, InventoryItem} from './subpages/Inventory.jsx'
import Placeholder from './subpages/Placeholder.jsx'
import './App.css'


function Home(recentlyViewed= {collections: [], items: []}) {
    const { inventory } = useContext(InventoryContext);
    
    return (
        <div>
            <HeroBanner/>
            <GetQuick inventory={inventory}/>
            <HotItems inventory={inventory} vertical={false}/>
            {recentlyViewed.collections?.length > 0 ? (
                <></>
                ) : (
                <>
                    <RecentViewed collection={true}/>
                </>
                )
            }
            {recentlyViewed.items?.length >0 ?(
                <>
                </>
                ) : (
                    <>
                    <RecentViewed />    
                    </>
                )
            }
            
        </div>
    )
}
function Footer(){
    return (
        <div className="w-full h-50 bg-[#090909] mt-5 flex flex-col gap-4 justify-center text-sm items-center text-(--text-tertiary)">
            <div className="border-b border-(--text-tertiary) w-[80%] flex flex-col justify-center items-center gap-2 md:w-[40%]">
                <h3 className="text-[1.25rem]">CarlShop</h3>
                <h6 className=" mb-2">© 2024 CarlShop. All rights reserved.</h6>
                
            </div>
            
            <div className="flex flex-col gap-2 justify-center items-center">
                <p className=" min-w-[360px]  text-center  md:w-[500px]">
                    This is a website inspired by the latest trends in e-commerce. 
                    A major inspiration was Pintrest! the collections feature, although simple,
                     was fun to make and I plan to do more with it as time goes on.

                </p>
                <label className="">Made with ❤️ by Samuel Parnell</label>
            </div>
        </div>
    )
}
function SideMenu({ activeMenu, setActiveMenu, user, profiles }) {
    return (
        <div className={`background-blur ${activeMenu ? "active" : ""}`} onClick={() => setActiveMenu(false)} >
            <div className={`side-menu ${activeMenu ? "active" : ""}`} onClick={(e) => e.stopPropagation()} >
                <div className="p-4" onClick={() => setActiveMenu(false)} >
                    <h1 className="text-6xl  text-(--text-primary) border-2 w-fit h-fit px-2 ">&times;</h1>
                </div>
                <div className="w-[90%] h-full text-(--text-primary) mx-auto">
                    <h3 className="text-2xl font-bold mb-4">{user ? user.username : "Menu"}</h3>
                    <ul className="flex flex-col gap-4 text-lg">
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/collections">Collections</Link></li>
                        <li><Link to="/my-collections">My Collections</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>

                </div>
                    

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
    // const recentlyViewed = JSON.parse(localStorage.getItem("recently-viewed")) || ({collections: []})

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
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <h3 className="bare-element"><Link to="/shop" className="ignore-element">Shop</Link></h3> 
                        <h3 className="bare-element"><Link to="/collections" className="ignore-element">Collections</Link></h3> {/* thinkin this could be perfect for a playlist maker */} 
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
                <Route path="/" element={<Home />}/>
                <Route path="/shop" element={<Inventory />} />
                <Route path="/shop/:id" element={<InventoryItem />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:id" element={<LookingatCollection />} />
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
        <Footer />
        </>
    )
}

export default App
