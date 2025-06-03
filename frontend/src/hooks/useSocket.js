import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";

const useSocket = (onMessage) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [socket, onMessage]);

  return socket;
};

export default useSocket;
