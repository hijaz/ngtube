const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const userRouter = require("./users/user.router");
const videoRouter = require("./videos/video.router");

const { connectToDatabase, disconnectFromDatabase } = require("./db");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/videos", videoRouter);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log("Express Server is up and running at port: " + port);
    });
  })
  .catch((error) => {
    console.log("Error starting the server", error);
  });

process.on("SIGINT", async () => {
  try {
    await disconnectFromDatabase();
    process.exit(0);
  } catch (error) {
    console.log("Error shutting down the server", error);
    process.exit(1);
  }
});
