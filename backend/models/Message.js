const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
//   chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  chatId: { type: String, required: true },
  sender: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
