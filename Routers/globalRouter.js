import express from "express";
import routes from "../routes";
import {
  home,
  join,
  login,
  search,
  getUpload,
  postUpload,
} from "../controllers/globalController";
import { uploadVideo } from "../middlewares";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.upload, getUpload);
globalRouter.post(routes.upload, uploadVideo, postUpload);

globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
