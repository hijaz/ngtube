const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoid: {
    type: String,
    required: true,
    unique: true,
  },
  userid: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  ratings: {
    type: [Number],
    required: true,
  },
  comments: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
