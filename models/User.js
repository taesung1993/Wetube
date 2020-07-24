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
    default: "/images/basicAvatar.png",
  },
  githubId: {
    type: Number,
  },
  googleId: {
    type: Number,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("Users", userSchema);

export default model;
