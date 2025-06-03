const express = require("express");
const { createChat, getAllChats } = require("../controllers/chatController");
const router = express.Router();

router.post("/", createChat);
router.get("/", getAllChats);

module.exports = router;
