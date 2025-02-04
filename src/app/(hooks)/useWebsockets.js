"use client";
import { useEffect, useRef, useState } from "react";

export default function useWebSocket() {
  const [data, setData] = useState([]); // This updates only when necessary
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);
  const isMounted = useRef(false); // Prevent effect from running multiple times

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMounted.current) return; // Prevents React from re-running effect
    isMounted.current = true;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "localhost:3001";

    // Ensure we remove "https://" or "http://" if it exists
    const cleanBackendUrl = backendUrl.replace(/^https?:\/\//, "");

    const socketUrl = `${protocol}://${cleanBackendUrl}/live-stnk-data`;

    console.log("🔵 Attempting WebSocket connection to:", socketUrl);
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log("🟢 WebSocket connected:", ws.current.readyState);
    };

    ws.current.onmessage = (event) => {
      try {
        console.log("📩 WebSocket message received:", event.data);
        const parsedData = JSON.parse(event.data);
        const trades = Array.isArray(parsedData) ? parsedData : [parsedData];

        setData((prev) => {
          // Extract existing trade IDs
          const existingTradeIds = new Set(prev.map((trade) => trade.tradeId));

          // Filter out duplicates before updating state
          const newTrades = trades.filter(
            (trade) => !existingTradeIds.has(trade.tradeId)
          );

          if (newTrades.length === 0) return prev; // Prevent unnecessary re-renders

          console.log("✅ Updating state with new trades:", newTrades);
          return [...prev, ...newTrades]; // Append only unique trades
        });
      } catch (error) {
        console.log("❌ Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.log("🔴 WebSocket Error:", error);
    };

    ws.current.onclose = (event) => {
      console.log("🛑 WebSocket closed:", event, "State:", event.code);

      ws.current = null;

      if (!reconnectTimeout.current) {
        reconnectTimeout.current = setTimeout(() => {
          console.log("🔄 Reconnecting WebSocket...");
          reconnectTimeout.current = null;
          ws.current = new WebSocket(socketUrl);
        }, 5000);
      }
    };

    return () => {
      console.log("🧹 Cleaning up WebSocket...");
      ws.current?.close();
      ws.current = null;
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
      isMounted.current = false;
    };
  }, []);

  return { data };
}
