"use client";
import React, { useState } from "react";
import styles from "./nav.module.css";

const BaseNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.navLinksDropDown} onClick={handleToggle}>
        <div
          className={`${styles["nav-icon3"]} ${isOpen ? styles.open : ""}`}
          onClick={handleToggle}
          style={{ cursor: "pointer", height: "100%", position: "relative" }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={styles.exchangesDiv}
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <a className={styles.links} href="/about">
            About
          </a>
          <a className={styles.links} href="/">
            Bybit
          </a>
          <a className={styles.links} href="/coinbase">
            Coinbase
          </a>
          <a className={styles.links} href="/gemini">
            Gemini
          </a>
        </div>
      </div>
      <div className={styles.navLinks}>
        <a className={styles.links} href="/about">
          About
        </a>
        <a className={styles.links} href="/">
          Bybit
        </a>
        <a className={styles.links} href="/coinbase">
          Coinbase
        </a>
        <a className={styles.links} href="/gemini">
          Gemini
        </a>
      </div>
    </>
  );
};

export default BaseNav;
