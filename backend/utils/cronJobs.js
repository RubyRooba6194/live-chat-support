const cron = require("node-cron");
const Message = require("../models/Message");

exports.setupCronJobs = () => {
  cron.schedule("0 * * * *", async () => {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await Message.deleteMany({ timestamp: { $lt: cutoff } });
    console.log("Old messages deleted");
  });
};
