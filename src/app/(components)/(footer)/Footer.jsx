"use server";
import React from "react";
import "./footer.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a className="links" href="/about">
            About
          </a>
          {/* <a href="/">Bybit</a>
          <a href="/gemini">Gemini</a>
          <a href="/coinbase">Coinbase</a> */}
        </div>
        <div className="social-icons">
          <a
            href="https://x.com/bybitpremiums"
            className="social-icon social-icon--twitter"
          >
            <FontAwesomeIcon className="twitter" icon={faTwitter} size="2x" />
          </a>

          <a
            href="https://www.tiktok.com/@bybitpremiums"
            className="social-icon social-icon--tiktok"
          >
            {/* <FontAwesomeIcon icon={faTiktok} className="gradient-icon" /> */}
            <FontAwesomeIcon
              className="tiktok"
              icon={faTiktok}
              mask={faSquareFull}
              size="2x"
            />
          </a>

          <a
            href="https://www.youtube.com/@BybitPremiums"
            className="social-icon social-icon--youtube"
          >
            <FontAwesomeIcon className="youtube" icon={faYoutube} size="2x" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
