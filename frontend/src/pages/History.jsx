import React, { useEffect, useState } from "react";
import HistoryList from "../components/history/HistoryList";
import api from "../services/api";
import toast from "react-hot-toast";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/messages/history");
      setHistory(response.data);
    } catch (error) {
      toast.error("Failed to load history");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
        Chat History
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading chat history...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">No chat history found.</p>
      ) : (
        <HistoryList history={history} />
      )}
    </div>
  );
};

export default History;
