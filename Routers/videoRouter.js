import express from "express";
import routes from "../routes";
import {
  videoDetail,
  editVideo,
  deleteVideo,
} from "../controllers/videoController";

export const videoRouter = express.Router();

videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
