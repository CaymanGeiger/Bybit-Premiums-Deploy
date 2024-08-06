"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "../logo.module.css";

const Logo = () => {
  const videoRef = useRef(null);
  // State to track if the video has started playing
  const [videoHasStarted, setVideoHasStarted] = useState(false);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => {
            setVideoHasStarted(true);
            // Remove event listeners once the video starts playing
            document.removeEventListener("touchstart", playVideo);
            document.removeEventListener("mousemove", playVideo);
          })
          .catch((err) => {
            console.log("Autoplay was prevented", err);
          });
      }
    };

    // Attempt to play the video on mount
    playVideo();

    // Add event listeners for touch and mousemove events as a failsafe
    document.addEventListener("touchstart", playVideo, { once: true });
    document.addEventListener("mousemove", playVideo, { once: true });

    return () => {
      // Cleanup event listeners when the component unmounts
      document.removeEventListener("touchstart", playVideo);
      document.removeEventListener("mousemove", playVideo);
    };
  }, []);

  return (
    <div className={styles.logoVideoDiv}>
      <video
        ref={videoRef}
        className={`${styles.logoVideo} ${
          videoHasStarted ? styles.show : styles.hide
        }`}
        autoPlay
        muted
        preload="auto"
        webkit-playsinline={true}
        playsInline={true}
        poster="/black.jpg"
      >
        <source src="/LogoGemini.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Logo;
