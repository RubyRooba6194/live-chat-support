import React from "react";

const MessageList = ({ messages }) => {
  if (!Array.isArray(messages)) {
    return <div>No messages to show.</div>;
  }

  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div key={msg._id || msg.id} className="p-2 bg-gray-100 rounded">
          <p>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
          <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
