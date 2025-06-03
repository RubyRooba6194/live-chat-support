import React, { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      onSend(trimmedText);
      setText("");
    }
  };

  return (
    <div className="flex items-center border-t pt-2">
      <input
        type="text"
        className="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:ring"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        onClick={handleSend}
        aria-label="Send Message"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default MessageInput;
