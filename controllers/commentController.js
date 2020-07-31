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
          id: req.user.id,
        },
        createdAt: newComment.createdAt,
        data: newComment.content,
        id: newComment._id,
      },
    });
  } catch (error) {
    console.log(error);
    obj.success = false;
    obj.error = error;
    res.json(obj);
  }
};

export const putComment = async (req, res) => {
  const { body } = req;
  const obj = {};
  try {
    if (body.success === false) {
      throw "the req is failed.";
    }
    const comment = await Comment.findById(body.commentId);
    comment.content = body.msg;
    comment.save();
    obj.success = true;
    obj.data = body.msg;
    return res.json(obj);
  } catch (error) {
    console.log(error);
    obj.success = false;
    obj.error = error;
    res.json(obj);
  }
};

export const deleteComment = async (req, res) => {
  const { body, user } = req;
  try {
    await Video.findOneAndUpdate(
      { _id: body.videoId },
      {
        $pull: {
          comments: body.commentId,
        },
      }
    );
    await User.findOneAndUpdate(
      { _id: user.id },
      {
        $pull: {
          comments: body.commentId,
        },
      }
    );
    await Comment.findOneAndDelete({ _id: body.commentId });
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: true,
      error,
    });
  }
};
