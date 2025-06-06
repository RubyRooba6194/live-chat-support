

// import React, { createContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", {
//   transports: ["websocket", "polling"],
// });

// export const SocketContext = createContext({ socket });

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Use env variable or fallback to localhost:3000
//     const backendUrl =
//       import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
//     const newSocket = io(backendUrl, {
//       transports: ["websocket"], // force websocket, no long-polling fallback
//       withCredentials: true,
//     });

//     newSocket.on("connect_error", (err) => {
//       console.error("Socket.IO connection error:", err);
//     });

//     setSocket(newSocket);
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );  
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create the context
export const SocketContext = createContext(null);

// Optional: Custom hook for easier context usage
export const useSocket = () => useContext(SocketContext);

// Provider component to wrap your app
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to backend with explicit transports
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket", "polling"], // Match backend configuration
    });

    setSocket(newSocket);

    // Clean up on unmount
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