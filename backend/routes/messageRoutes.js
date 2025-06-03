const express = require("express");
const { getMessagesByChat } = require("../controllers/messageController");
const router = express.Router();

router.get("/:chatId", getMessagesByChat);

module.exports = router;
