import express from "express";
import routes from "../routes";
import {
  userDetail,
  changePassword,
  meDetail,
  getEditProfile,
  postEditProfile,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

export const userRouter = express.Router();

userRouter.get(routes.me, meDetail);
userRouter.get(routes.userDetail(), userDetail);

// Edit Profile
userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile(), uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword(), onlyPrivate, changePassword);
