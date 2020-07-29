import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const addComment = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const obj = {};
  try {
    if (!body.success) throw "req is failed";
    const user = await User.findById(req.user.id);
    const video = await Video.findById(id);
    let newComment = await Comment.create({
      content: body.msg,
      creator: req.user._id,
      video: id,
      name: req.user.name,
      avatarUrl: req.user.avatarUrl,
    });
    video.comments.push(newComment._id);
    user.comments.push(newComment._id);
    user.save();
    video.save();
    res.json({
      success: true,
      data: {
        creator: {
          name: req.user.name,
          avatar: req.user.avatarUrl,
        },
        createdAt: newComment.createdAt,
        data: newComment.content,
      },
    });
  } catch (error) {
    console.log(error);
    obj.success = false;
    obj.error = error;
    res.json(obj);
  }
};
