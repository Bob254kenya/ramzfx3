import React, { useState, useEffect } from 'react';
import { Loader } from '@deriv-com/ui';

export default function ChunkLoader({ message }: { message: string }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let progressVal = 0;
        const duration = 5000; // 5 seconds
        const interval = 50; // Update every 50ms
        const increment = (100 / duration) * interval;

        const timer = setInterval(() => {
            progressVal += increment;
            if (progressVal >= 100) {
                progressVal = 100;
                clearInterval(timer);
            }
            setProgress(Math.floor(progressVal));
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='app-root'>
            <div className="logo-container" style={{ position: 'relative', marginBottom: '40px' }}>
                <div className="spinner-ring" style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '-15px',
                    width: '130px',
                    height: '130px',
                    border: '4px solid rgba(255, 255, 255, 0.1)',
                    borderTop: '4px solid #4CAF50',
                    borderRadius: '50%',
                    animation: 'spin 1.2s linear infinite'
                }}></div>
                <img src="/deriv-logo.svg" alt="RAMZFX" style={{
                    width: '100px',
                    height: '100px',
                    animation: 'pulse 2s ease-in-out infinite'
                }} />
            </div>
            <div className='load-message'>{message}</div>
            <div style={{ width: '300px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px', marginTop: '20px' }}>
                <div style={{
                    height: '8px',
                    background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
                    width: `${progress}%`,
                    transition: 'width 0.1s ease-out',
                    borderRadius: '10px'
                }}></div>
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>{progress}%</div>
        </div>
    );
}