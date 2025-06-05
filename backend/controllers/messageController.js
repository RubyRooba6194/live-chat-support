const Message = require("../models/Message");

exports.getMessagesByChat = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId });
  res.json(messages);
};

// Existing function for creating a message
exports.createMessage = async (req, res) => {
  try {
    const { chatId, sender, text } = req.body;
    const userMessage = await Message.create({ chatId, sender, text });
    res.status(201).json(userMessage);

    // --- Bot automatic reply logic ---
    // (If you have Socket.IO, emit from here too)
    setTimeout(async () => {
      const botReply = await Message.create({
        chatId,
        sender: "Bot",
        text: `Hello ${sender}, you said: "${text}"`
      });
      // If using Socket.IO, emit this message to clients here
      if (req.app && req.app.get("io")) {
        req.app.get("io").to(chatId).emit("message", botReply);
      }
    }, 1000); // 1 second delay for realism
  } catch (err) {
    res.status(400).json({ error: "Failed to create message", details: err.message });
  }
};