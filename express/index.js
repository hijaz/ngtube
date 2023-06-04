const express = require("express");

const userRouter = require("./users/user.router");

const { connectToDatabase, disconnectFromDatabase } = require("./db");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);

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
