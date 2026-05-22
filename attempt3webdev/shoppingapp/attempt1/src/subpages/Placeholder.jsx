import './css/placeholder.css';

import sign from '../assets/ap71421.png'

function Placeholder() {
    return (
        <>
        <div className="placeholder-container">
            <img src={sign} alt="sign"/>
            <h1>UNDER CONSTRUCTION</h1>
            <p>Please check back later.</p>
        </div>
        </>
    );
}

export default Placeholder;