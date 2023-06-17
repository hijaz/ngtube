const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const userRouter = require("./users/user.router");
const videoRouter = require("./videos/video.router");
const { createVideo } = require("./videos/video.controller");

const { connectToDatabase, disconnectFromDatabase } = require("./db");

console.log(path.resolve(__dirname, ".env"));

const app = express();
const port = 3000;
const uploadService = multer({ dest: "uploads" });

app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.post("/uploadVideo", uploadService.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file attached!");
  }

  const file = req.file;
  const fileName = file.originalname;
  const newFilePath = path.join(__dirname, "uploads", fileName);

  fs.rename(file.path, newFilePath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else {
      const { title, description, videoid, userid } = req.body;
      const videoData = {
        title,
        description,
        videoid,
        userid,
        views: 0,
        ratings: [],
        comments: [],
      };

      try {
        await createVideo(videoData);
        return res.status(200).send("File uploaded succesfully");
      } catch (err) {
        res.send(500).send(`Error uploading file: ${err}`);
      }
    }
  });
});

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
