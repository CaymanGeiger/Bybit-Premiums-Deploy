"use client"
import React, { useRef, useEffect } from 'react';
import styles from './logo.module.css'

const Logo = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const attemptAutoplay = () => {
            if (videoRef.current) {
            videoRef.current.play().catch(err => console.log('Autoplay was prevented', err));
            }
            document.removeEventListener('touchstart', attemptAutoplay);
        };

        document.addEventListener('touchstart', attemptAutoplay);

        return () => {
            document.removeEventListener('touchstart', attemptAutoplay);
        };
        }, []);

    return (
        <div className={styles.logoVideoDiv}>
            <video
                ref={videoRef}
                className={styles.logoVideo}
                autoPlay
                muted
                playsInline
                preload="auto"
                webkit-playsinline="true"
                playsinline="true"
                poster='https://w0.peakpx.com/wallpaper/410/412/HD-wallpaper-plain-black-black.jpg'
            >
                <source src="/Logo.mp4" type="video/mp4" />
            </video>
        </div>
    )
}
export default Logo;
