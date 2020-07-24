import express from "express";
import passport from "passport";
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
  githubLogin,
  postGithubLogin,
  googleLogin,
  postGoogleLogin,
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

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCb,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCb,
  passport.authenticate("google", { failureRedirect: "/login" }),
  postGoogleLogin
);
