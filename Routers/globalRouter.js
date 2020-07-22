import express from "express";
import routes from "../routes";
import {
  home,
  join,
  login,
  upload,
  search,
} from "../controllers/globalController";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.upload, upload);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
