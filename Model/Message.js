const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: { type: Date, required: true, default: Date.now },
  email: String,
  ipAddress: String,
  tag: {
    type: String,
    required: true,
    default: "home",
  },
});
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
