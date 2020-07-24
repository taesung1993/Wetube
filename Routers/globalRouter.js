import express from "express";
import routes from "../routes";
import {
  home,
  search,
  getUpload,
  postUpload,
  getJoin,
  postJoin,
  postLogin,
  getLogin,
  logout,
} from "../controllers/globalController";
import { uploadVideo, onlyPrivate, onlyPublic } from "../middlewares";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.upload, onlyPrivate, getUpload);
globalRouter.post(routes.upload, uploadVideo, postUpload);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
