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
                playsInline={true}
                webkit-playsinline="true"
                preload="auto"
            >
                <source src="/Logo.mp4" type="video/mp4" />
            </video>
        </div>
    )
}
export default Logo;
