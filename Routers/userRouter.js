import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword,
  meDetail,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

export const userRouter = express.Router();

userRouter.get(routes.me, meDetail);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.editProfile(), onlyPrivate, editProfile);
userRouter.get(routes.changePassword(), onlyPrivate, changePassword);
