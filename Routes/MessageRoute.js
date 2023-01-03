const express = require("express");
const route = express.Router();
const message = require("../Controller/MessageController");
route.post("/createMessage", message.createMessage);
route.get("/getMessage/:tagMessage", message.getMessage);
route.delete("/:id", message.deleteMessage);
module.exports = route;
