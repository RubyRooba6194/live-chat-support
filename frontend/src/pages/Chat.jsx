import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import ChatBox from "../components/chat/ChatBox";
import axios from "axios"; // adjust the path as needed
import { v4 as uuidv4 } from "uuid"; // Add uuid for temp IDs

const Chat = () => {
  const { chatId: rawChatId } = useParams();
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
        setMessages((prev) => {
          // Remove any optimistic message that matches (by content, sender, timestamp, or tempId if you use it)
          const filtered = prev.filter(
            (m) =>
              !(
                m._optimistic &&
                m.text === message.text &&
                m.sender === message.sender &&
                m.timestamp === message.timestamp
              )
          );
          // Avoid adding duplicate if the message already exists (by _id or unique content+timestamp)
          const exists = filtered.some(
            (m) =>
              (m._id && message._id && m._id === message._id) ||
              (m.text === message.text &&
                m.sender === message.sender &&
                m.timestamp === message.timestamp)
          );
          return exists ? filtered : [...filtered, message];
        });
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
    const timestamp = new Date().toISOString();
    const tempId = uuidv4();
    const newMessage = {
      chatId,
      sender,
      text,
      timestamp,
      _optimistic: true,
      tempId,
    };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("sendMessage", { ...newMessage }); // Don't send tempId/_optimistic to backend
  };

  return (
    <div className="max-w-3xl mx-auto p-4 h-[80vh]">
      <ChatBox messages={messages} onSend={handleSend} />
    </div>
  );
};

export default Chat;
