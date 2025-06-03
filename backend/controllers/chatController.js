const Chat = require("../models/Chat");

exports.createChat = async (req, res) => {
  try {
    const { participants } = req.body;
    const chat = await Chat.create({ participants });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllChats = async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
};
