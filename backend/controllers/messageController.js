const Message = require("../models/Message");

exports.getMessagesByChat = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId });
  res.json(messages);
};
