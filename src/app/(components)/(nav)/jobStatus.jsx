"use client";
import React, { useEffect, useState } from "react";
import styles from "./nav.module.css";

const JobStatus = ({
  getCircleColor,
  formatDate,
  jobStatusIsOpen,
  setJobStatusIsOpen,
}) => {
  const [statuses, setStatuses] = useState({
    bybitBorrowRates: { status: "Unknown", timestamp: "" },
    bybitFundingRates: { status: "Unknown", timestamp: "" },
    coinbaseFundingRates: { status: "Unknown", timestamp: "" },
    geminiFundingRates: { status: "Unknown", timestamp: "" },
    bybitBorrowRateVolumes: { status: "Unknown", timestamp: "" },
    bybitFundingRateVolumes: { status: "Unknown", timestamp: "" },
    coinbaseFundingRateVolumes: { status: "Unknown", timestamp: "" },
    geminiFundingRateVolumes: { status: "Unknown", timestamp: "" },
  });

  const fetchStatuses = async () => {
    const url = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!url) return;

    try {
      const responses = await Promise.all([
        fetch(`${url}/bybit-borrow-rates-status`).then((res) => res.json()),
        fetch(`${url}/bybit-funding-rates-status`).then((res) => res.json()),
        fetch(`${url}/coinbase-funding-rates-status`).then((res) => res.json()),
        fetch(`${url}/gemini-funding-rates-status`).then((res) => res.json()),
        fetch(`${url}/bybit-borrow-rate-volumes-status`).then((res) =>
          res.json()
        ),
        fetch(`${url}/bybit-funding-rate-volumes-status`).then((res) =>
          res.json()
        ),
        fetch(`${url}/coinbase-funding-rate-volumes-status`).then((res) =>
          res.json()
        ),
        fetch(`${url}/gemini-funding-rate-volumes-status`).then((res) =>
          res.json()
        ),
      ]);

      const newStatuses = {
        bybitBorrowRates: {
          status: responses[0]?.updateStatus || "Unknown",
          timestamp: responses[0]?.timestamp || "",
        },
        bybitFundingRates: {
          status: responses[1]?.updateStatus || "Unknown",
          timestamp: responses[1]?.timestamp || "",
        },
        coinbaseFundingRates: {
          status: responses[2]?.updateStatus || "Unknown",
          timestamp: responses[2]?.timestamp || "",
        },
        geminiFundingRates: {
          status: responses[3]?.updateStatus || "Unknown",
          timestamp: responses[3]?.timestamp || "",
        },
        bybitBorrowRateVolumes: {
          status: responses[4]?.updateStatus || "Unknown",
          timestamp: responses[4]?.timestamp || "",
        },
        bybitFundingRateVolumes: {
          status: responses[5]?.updateStatus || "Unknown",
          timestamp: responses[5]?.timestamp || "",
        },
        coinbaseFundingRateVolumes: {
          status: responses[6]?.updateStatus || "Unknown",
          timestamp: responses[6]?.timestamp || "",
        },
        geminiFundingRateVolumes: {
          status: responses[7]?.updateStatus || "Unknown",
          timestamp: responses[7]?.timestamp || "",
        },
      };

      console.log("New statuses:", newStatuses);

      setStatuses(newStatuses);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  const capitalizeWords = (str) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase())
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className={styles.jobStatus}>
      <h2
        onClick={() => setJobStatusIsOpen(false)}
        style={{
          cursor: "pointer",
          textAlign: "right",
          position: "absolute",
          top: "2px",
          right: "8px",
        }}
      >
        x
      </h2>
      {Object.entries(statuses).map(([key, { status, timestamp }]) => (
        <div className={styles.statusItem} key={key}>
          <span
            className={styles.statusCircle}
            style={{ backgroundColor: getCircleColor(status) }}
          ></span>
          <h5 style={{ minWidth: "255px" }}>
            {capitalizeWords(key.replace(/([A-Z])/g, " $1"))}
          </h5>
          <span>
            <h5>{formatDate(timestamp) || "No Date"}</h5>
          </span>
        </div>
      ))}
    </div>
  );
};

export default JobStatus;
