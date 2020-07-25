import express from "express";
import routes from "../routes";
import {
  userDetail,
  meDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

export const userRouter = express.Router();

userRouter.get(routes.me, meDetail);
userRouter.get(routes.userDetail(), userDetail);

// Edit Profile
userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile(), uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword(), onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword(), postChangePassword);
