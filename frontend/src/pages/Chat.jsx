import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import ChatBox from "../components/chat/ChatBox";
import axios from "axios";

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const chatId = "example-chat-id"; // Replace with dynamic chat ID in real app
  const sender = "User"; // Replace with actual user

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", chatId);

    // Fetch previous messages from backend
    axios
      .get(`/api/messages/${chatId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Failed to fetch messages:", err));

    // Listen for new messages
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };
    socket.on("newMessage", handleNewMessage);

    // Cleanup listener on unmount or socket change
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId, socket]);

  const handleSend = (text) => {
    if (!socket) return;
    socket.emit("sendMessage", { chatId, sender, text });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 h-[80vh]">
      <ChatBox messages={messages} onSend={handleSend} />
    </div>
  );
};

export default Chat;
