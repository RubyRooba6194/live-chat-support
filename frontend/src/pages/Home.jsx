import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center p-6">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-blue-700 mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to SmartChat Support
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 text-center max-w-xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Experience intelligent support with our AI Chatbot and live agent
        assistance — real-time messaging, history tracking, and more!
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/chat">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition duration-200">
            Start Chat
          </button>
        </Link>
        <Link to="/history">
          <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-blue-700 rounded-xl shadow-md transition duration-200">
            View History
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
