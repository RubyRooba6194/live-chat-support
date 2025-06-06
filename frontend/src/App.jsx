import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Layout from "./components/common/Layout";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Layout>
      </Router>
    </SocketProvider>
  );
}

export default App;
