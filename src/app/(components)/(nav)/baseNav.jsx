// BaseNav.js
"use client";
import React, { useState, Suspense, lazy } from "react";
import { usePathname } from "next/navigation";
import styles from "./nav.module.css";
import { format } from "date-fns";

const JobStatus = lazy(() => import("./jobStatus"));

const BaseNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobStatusIsOpen, setJobStatusIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Use pathname to check for "/admin" in the URL
  const isAdminRoute = pathname ? pathname.includes("/admin") : false;

  const getCircleColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Failed":
        return "red";
      case "Processing":
        return "yellow";
      default:
        return "gray"; // Default color if status is unknown
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return format(new Date(timestamp), "MM/dd/yyyy h:mm a");
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
          style={{
            display: isOpen ? "flex" : "none",
            bottom: isAdminRoute ? "-14.7em" : "-10.6em",
            right: "-0.8em",
          }}
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
          {isAdminRoute && (
            <a
              className={styles.links}
              style={{ cursor: "pointer" }}
              onClick={() => setJobStatusIsOpen(!jobStatusIsOpen)}
            >
              Job Status
            </a>
          )}
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
        {isAdminRoute && (
          <a
            className={styles.links}
            style={{ cursor: "pointer" }}
            onClick={() => setJobStatusIsOpen(!jobStatusIsOpen)}
          >
            Job Status
          </a>
        )}
        {jobStatusIsOpen && (
          <Suspense fallback={<div>Loading...</div>}>
            <JobStatus
              getCircleColor={getCircleColor}
              formatDate={formatDate}
              setJobStatusIsOpen={setJobStatusIsOpen}
            />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default BaseNav;
