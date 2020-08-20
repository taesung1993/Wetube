import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name is required",
  },
  email: {
    type: String,
    required: "email is required",
  },
  avatarUrl: {
    type: String,
    default:
      "https://wetubesuperstorage.s3.ap-northeast-2.amazonaws.com/images/basicAvatar.png",
  },
  githubId: {
    type: Number,
  },
  googleId: {
    type: Number,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Videos",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("Users", userSchema);

export default model;
