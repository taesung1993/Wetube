import express from "express";
import routes from "../routes";
import {
  addComment,
  putComment,
  deleteComment,
} from "../controllers/commentController";
import {
  postView,
  postVideoLike,
  postVideoUnlike,
  incrementUserFollow,
  decrementUserFollow,
  isFollowed,
} from "../controllers/videoController";
import { importUserVideos } from "../controllers/userController";

export const apiRouter = express.Router();

// related to Comment
apiRouter.post(routes.apiVideoComment, addComment);
apiRouter.put(routes.apiVideoComment, putComment);
apiRouter.delete(routes.apiVideoComment, deleteComment);

// related to View
apiRouter.post(routes.apiVideoView, postView);

// related to video like
apiRouter.post(routes.apiVideoLike, postVideoLike);
apiRouter.post(routes.apiVideoUnlike, postVideoUnlike);

// related to user following
apiRouter.post(routes.apiUserFollow, isFollowed);
apiRouter.put(routes.apiUserFollow, incrementUserFollow);
apiRouter.delete(routes.apiUserFollow, decrementUserFollow);

// related to importing  video in video detail page
apiRouter.post(routes.apiUsersVideo, importUserVideos);
