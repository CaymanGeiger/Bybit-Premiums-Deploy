"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useWebSocket from "../(hooks)/useWebsockets";
import { v4 as uuidv4 } from "uuid"; // For unique identifiers

const LiveSTNKTrades = () => {
  const [liveData, setLiveData] = useState([]);
  const tradeQueue = useRef([]); // Queue for incoming trades
  const processingQueue = useRef(false); // Prevents multiple queue processors from running

  const { data } = useWebSocket(); // Incoming WebSocket trades

  useEffect(() => {
    if (data.length > 0) {
      // Append new trades to the queue with unique IDs
      tradeQueue.current = [
        ...tradeQueue.current,
        ...data.map((trade) => ({
          ...trade,
          uniqueId: uuidv4(), // Assign a unique identifier
        })),
      ];

      processQueue(); // Start processing queue
    }
  }, [data]);

  const processQueue = () => {
    if (processingQueue.current) return; // Prevent multiple processors from running
    processingQueue.current = true;

    const processNext = () => {
      if (tradeQueue.current.length === 0) {
        processingQueue.current = false;
        return;
      }

      const trade = tradeQueue.current.shift(); // Get next trade in queue
      setLiveData((prev) => [...prev, trade]);

      // Schedule removal after 12s using uniqueId
      setTimeout(() => {
        setLiveData((prev) =>
          prev.filter((t) => t.uniqueId !== trade.uniqueId)
        );
      }, 12000);

      setTimeout(processNext, 300); // Stagger trade addition every 300ms
    };

    processNext();
  };

  console.log("📊 Live Data Count:", liveData.length);

  return (
    <div
      className="live-data-container"
      style={{
        padding: "20px",
        color: "#fff",
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "relative",
        width: "100vw",
        height: "50px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {liveData.map((trade) => (
        <motion.div
          key={trade.uniqueId}
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ ease: "linear", duration: 10 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 16px",
            background: "#333",
            borderRadius: "5px",
            minWidth: "200px",
            marginRight: "20px",
            position: "absolute",
            whiteSpace: "nowrap",
            top: 3,
          }}
        >
          <span
            style={{
              color: trade.side === "buy" ? "green" : "red",
              fontWeight: "bold",
              marginRight: "8px",
            }}
          >
            {trade.side.toUpperCase()}
          </span>
          <span>${trade.price}</span>
          <span style={{ marginLeft: "8px" }}>{trade.size} STNK</span>
        </motion.div>
      ))}
    </div>
  );
};

export default LiveSTNKTrades;
