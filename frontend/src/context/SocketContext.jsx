

import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

export const SocketContext = createContext({ socket });

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Use env variable or fallback to localhost:3000
    const backendUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
    const newSocket = io(backendUrl, {
      transports: ["websocket"], // force websocket, no long-polling fallback
      withCredentials: true,
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err);
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );  
};