const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ extended: false })); //urlencoded
app.use(cors()); //cors
const movieRoute = require("./Routes/MovieRoute");
const messageRoute = require("./Routes/MessageRoute");

//const entryRoute=require('./Routes/EntryRoutes')
// console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
//message/createMessage
app.use("/message", messageRoute);
app.use("/movie", movieRoute);
app.get("/", (req, res) => {
  res.send("Hello Movie Star API");
});
//app.use('/entry',entryRoute);
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
/*
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
*/
