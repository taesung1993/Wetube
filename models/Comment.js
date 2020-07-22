import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: "Content is required",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Creator is required",
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Videos",
  },
});

const model = mongoose.model("Comments", commentSchema);

export default model;
