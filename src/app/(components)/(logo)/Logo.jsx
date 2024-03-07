"use client"
import React, { useRef, useEffect, useState } from 'react';
import styles from './logo.module.css';

const Logo = () => {
    const videoRef = useRef(null);
    // State to track if the video has started playing
    const [videoHasStarted, setVideoHasStarted] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().then(() => {
                // When playback successfully starts, update state
                setVideoHasStarted(true);
            }).catch(err => {
                console.log('Autoplay was prevented', err);
                // Here, you might want to handle the failure of autoplay,
                // For example, by showing a play button to start the video manually.
            });
        }
    }, []);

    return (
        <div className={styles.logoVideoDiv}>
            <video
                ref={videoRef}
                className={`${styles.logoVideo} ${videoHasStarted ? styles.show : styles.hide}`}
                autoPlay
                muted
                playsInline
                preload="auto"
                webkit-playsinline="true"
                playsinline="true"
                poster='/black.jpg'
            >
                <source src="/Logo.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default Logo;
