const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { setupCronJobs } = require("./utils/cronJobs");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.set("io", io);
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    const { chatId, sender, text } = data;
    const Message = require("./models/Message");
    const newMessage = await Message.create({ chatId, sender, text });
    io.to(chatId).emit("newMessage", newMessage);
  });

  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

setupCronJobs();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
