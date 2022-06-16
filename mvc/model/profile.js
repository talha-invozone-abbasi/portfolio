const mongoose = require("mongoose");

const Profile = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
    },
    skills: {
      type: [String],
      required: true,
    },
    social: {
      facebook: String,
      linkedin: String,
      twitter: String,
    },
    likes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", Profile);
