const express = require("express");

const {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideoByVideoId,
} = require("./video.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const videos = await getVideos();
    res.status(200);
    res.send(videos);
  } catch (error) {
    console.error("Error fetching all the videos", error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

router.get("/:videoid", async (req, res) => {
  try {
    const videoId = req.params.videoid;
    const video = await getVideoById(videoId);
    res.status(200);
    res.send(video);
  } catch (error) {
    console.error("Error fetching video by id", error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newVideo = await createVideo(req.body);
    res.status(200);
    res.send(newVideo);
  } catch (error) {
    console.error("Error creating a new video", req.body, error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

router.put("/:videoid", async (req, res) => {
  try {
    const videoId = req.params.videoid;
    const updatedVideo = await updateVideo(videoId, req.body);
    res.status(200);
    res.send(updatedVideo);
  } catch (error) {
    console.error("Error updating a new video", req.body, error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

router.delete("/:videoid", async (req, res) => {
  try {
    const videoId = req.params.videoid;
    const deletedVideo = await deleteVideo(videoId);
    res.status(200);
    res.send("Video deleted succesfully");
  } catch (error) {
    console.error("Error deleting a video", req.body, error);
    res.status(500);
    res.send({
      error: true,
      msg: JSON.stringify(error),
    });
  }
});

module.exports = router;
