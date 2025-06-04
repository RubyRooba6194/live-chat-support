import React from "react";

const HistoryList = ({ history, onSelect }) => {
    const safeHistory = Array.isArray(history) ? history : [];

  if (!history || history.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">
        No chat history available.
      </div>
    );
  }


  return (
    <div className="overflow-y-auto space-y-2 p-4">
      {history.map((session, index) => (
        <div
          key={index}
          className="cursor-pointer p-3 border rounded-lg shadow-sm hover:bg-blue-100 transition"
          onClick={() => onSelect(session)}
        >
          <div className="font-medium">Session {index + 1}</div>
          <div className="text-xs text-gray-600">
            {new Date(session.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
