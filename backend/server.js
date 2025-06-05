const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup with CORS and transports
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Import models and routes
const Message = require("./models/Message");
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { chatId, sender, text } = data;

      // Save user message
      const newMessage = await Message.create({ chatId, sender, text });
      io.to(chatId).emit("newMessage", newMessage);

      // BOT auto reply
      const botMessage = await Message.create({
        chatId,
        sender: "Bot",
        text: `Hi ${sender}, you said: "${text}"`,
      });
      io.to(chatId).emit("newMessage", botMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Failed to send message." });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
