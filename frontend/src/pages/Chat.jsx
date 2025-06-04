// import { useParams } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import { SocketContext } from "../context/SocketContext";
// import ChatBox from "../components/chat/ChatBox";
// import axios from "axios";

// const Chat = () => {
//   const { chatId } = useParams();
//   const { socket } = useContext(SocketContext);
//   const [messages, setMessages] = useState([]);

//   // Replace this with user context if available
//   const sender = "User";

//   useEffect(() => {
//     if (!socket) return;

//     socket.emit("joinRoom", chatId);

//     axios
//       .get(`/api/messages/${chatId}`)
//       .then((res) => setMessages(res.data))
//       .catch((err) => console.error("Failed to fetch messages:", err));

//     const handleNewMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
//     };
//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [chatId, socket]);

//   const handleSend = (text) => {
//     if (!socket) return;
//     const newMessage = {
//       chatId,
//       sender,
//       text,
//       timestamp: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, newMessage]); // Show new message instantly
//     socket.emit("sendMessage", newMessage);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4 h-[80vh]">
//       <ChatBox messages={messages} onSend={handleSend} />
//     </div>
//   );
// };

// export default Chat;


import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import ChatBox from "../components/chat/ChatBox";
import axios from "axios";

const Chat = () => {
  const { chatId: rawChatId } = useParams();
  // Fallback to 'global-chat' if chatId is not provided in the route.
  const chatId = rawChatId || "global-chat";
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);

  // Replace this with user context if available
  const sender = "User";

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", chatId);

    axios
      .get(`/api/messages/${chatId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Failed to fetch messages:", err));

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId, socket]);

  const handleSend = (text) => {
    if (!chatId) {
      console.warn("chatId is undefined! Message will not be sent.");
      return;
    }
    if (!socket) return;
    const newMessage = {
      chatId,
      sender,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]); // Show new message instantly
    socket.emit("sendMessage", newMessage);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 h-[80vh]">
      <ChatBox messages={messages} onSend={handleSend} />
    </div>
  );
};

export default Chat;