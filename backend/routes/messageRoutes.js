const express = require("express");
const {
  getMessagesByChat,
  createMessage,
} = require("../controllers/messageController");
const router = express.Router();

router.get("/:chatId", getMessagesByChat);
router.post("/", createMessage); // <-- Add this line

module.exports = router;
