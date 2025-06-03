import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, History, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-700">SmartChat</h1>
      <div className="flex gap-4">
        <Link to="/" className={linkClass("/")}>
          <Home size={18} />
          Home
        </Link>
        <Link to="/chat" className={linkClass("/chat")}>
          <MessageCircle size={18} />
          Chat
        </Link>
        <Link to="/history" className={linkClass("/history")}>
          <History size={18} />
          History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
