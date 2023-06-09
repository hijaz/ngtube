const Video = require("./video.schema");

// Create a new Video
const createVideo = async (videoData) => {
  try {
    const newVideo = new Video(videoData);
    await newVideo.save();
    return newVideo;
  } catch (error) {
    console.error("Error creating a new video", error);
    throw error;
  }
};

// Read All the videos
const getVideos = async () => {
  try {
    const videos = await Video.find();
    return videos;
  } catch (error) {
    console.error("Error reading all the videos", error);
    throw error;
  }
};

// Read a specific video
const getVideoById = async (videoId) => {
  try {
    const video = await Video.findById(videoId);
    return video;
  } catch (error) {
    console.error("Error reading video by id", error);
    throw error;
  }
};

// Read a specific video by videoname
const getVideoByVideoId = async (videoid) => {
  try {
    const video = await Video.findOne({ videoid: videoid });
    return video;
  } catch (error) {
    console.error("Error reading video by videoid", error);
    throw error;
  }
};

// Update a video by videoId
const updateVideoByVideoId = async (videoid, videoData) => {
  try {
    const video = await Video.findOne({ videoid });
    const updatedVideo = Video.findByIdAndUpdate(video._id, videoData, {
      new: true,
    });
    return updatedVideo;
  } catch (error) {
    console.error("Error updating video", error);
    throw error;
  }
};

// Update a video
const updateVideo = async (videoId, videoData) => {
  try {
    const updatedVideo = Video.findByIdAndUpdate(videoId, videoData, {
      new: true,
    });
    return updatedVideo;
  } catch (error) {
    console.error("Error updating video", error);
    throw error;
  }
};

// Increment View Count
const incrementViewCount = async (videoId) => {
  try {
    const video = await getVideoByVideoId(videoId);
    const currentViews = video.views;
    await updateVideo(video._id, { views: currentViews + 1 });
  } catch (error) {
    console.error("Error incrementing view count");
    throw error;
  }
};

// Delete a video
const deleteVideo = async (videoId) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    return deleteVideo;
  } catch (error) {
    console.error("Error deleting the video");
    throw error;
  }
};

module.exports = {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  updateVideoByVideoId,
  deleteVideo,
  getVideoByVideoId,
  incrementViewCount,
};
