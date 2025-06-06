// server.js
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");

// --- EXPRESS APP SETUP ---
const app = express();
app.use(cors());
app.use(express.json());

// --- DATABASE SETUP (MongoDB) ---
const MONGO_URI = "mongodb://localhost:27017/live-chat-support";
mongoose.connect(MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// --- MESSAGE SCHEMA ---
const messageSchema = new mongoose.Schema({
  chatId: String,
  sender: String,
  text: String,
  timestamp: String,
});
const Message = mongoose.model("Message", messageSchema);

// --- HTTP SERVER ---
const server = http.createServer(app);

// --- SOCKET.IO SETUP ---
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Ensure both transports are allowed
});

// --- SOCKET.IO LOGIC ---
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);

    // Optional: Send welcome message from bot
    const welcomeMsg = {
      chatId,
      sender: "Bot",
      text: "Welcome to the chat!",
      timestamp: new Date().toISOString(),
    };
    socket.emit("newMessage", welcomeMsg);
    Message.create(welcomeMsg);
  });
  
  const cors = require("cors");
  app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
  
  socket.on("sendMessage", async (msg) => {
    const { chatId, sender, text, timestamp } = msg;
    const cleanMsg = { chatId, sender, text, timestamp };
    await Message.create(cleanMsg);
    io.to(chatId).emit("newMessage", cleanMsg);

    // Bot auto-reply
    setTimeout(async () => {
      const botMsg = {
        chatId,
        sender: "Bot",
        text: `Bot: You said "${text}"`,
        timestamp: new Date().toISOString(),
      };
      await Message.create(botMsg);
      io.to(chatId).emit("newMessage", botMsg);
    }, 1200);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// --- API ENDPOINTS ---
app.get("/api/messages/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).sort({
      timestamp: 1,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// --- SERVER START ---
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
