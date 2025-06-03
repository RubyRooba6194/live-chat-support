import React, { useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatBox = ({ messages, onSend }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-lg p-4">
      <div className="flex-1 overflow-y-auto mb-2">
        <MessageList messages={messages} />
        <div ref={bottomRef} />
      </div>
      <MessageInput onSend={onSend} />
    </div>
  );
};

export default ChatBox;
