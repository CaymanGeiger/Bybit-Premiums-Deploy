// JobStatus.js
import React, { useEffect, useState } from "react";
import styles from "./nav.module.css";
import { format } from "date-fns";

const JobStatus = ({ getCircleColor, formatDate }) => {
  const [statuses, setStatuses] = useState({
    bybitBorrowRates: { status: "Unknown", timestamp: "" },
    bybitFundingRates: { status: "Unknown", timestamp: "" },
    coinbaseFundingRates: { status: "Unknown", timestamp: "" },
    geminiFundingRates: { status: "Unknown", timestamp: "" },
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
      ]);

      setStatuses({
        bybitBorrowRates: {
          status: responses[0].updateStatus || "Unknown",
          timestamp: responses[0].timestamp || "",
        },
        bybitFundingRates: {
          status: responses[1].updateStatus || "Unknown",
          timestamp: responses[1].timestamp || "",
        },
        coinbaseFundingRates: {
          status: responses[2].updateStatus || "Unknown",
          timestamp: responses[2].timestamp || "",
        },
        geminiFundingRates: {
          status: responses[3].updateStatus || "Unknown",
          timestamp: responses[3].timestamp || "",
        },
      });
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
      {Object.entries(statuses).map(([key, { status, timestamp }]) => (
        <div className={styles.statusItem} key={key}>
          <span
            className={styles.statusCircle}
            style={{ backgroundColor: getCircleColor(status) }}
          ></span>
          <h4 style={{ minWidth: "200px" }}>
            {capitalizeWords(key.replace(/([A-Z])/g, " $1"))}
          </h4>
          <span>{formatDate(timestamp) || "No Date"}</span>
        </div>
      ))}
    </div>
  );
};

export default JobStatus;
