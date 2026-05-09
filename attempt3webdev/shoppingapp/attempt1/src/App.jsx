import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loggedin, setLogin] = useState(false)
  const [username, setUsername] = useState('')
  return (
    <>
      <section id="header">
        <div className="header-content">
          <h2 className="header-title">CarlShop</h2>
          <div className="profiles">
            <img src={heroImg} alt="hero image" />
            <h3>{loggedin ? {username} : 'Login'}</h3>
          </div>
        </div>
      </section>

      <div className="ticks"></div>


      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
