import React from 'react';
import Wave from 'react-wavify';


function WaveSection() {
    return (
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
            <Wave fill='#1A1A1A' paused={false} options={{ height: 50, amplitude: 40, speed: 0.25, points: 3 }}/>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <h1>Wave Section</h1>
            </div>
        </div>
    
    );
}


export default WaveSection;