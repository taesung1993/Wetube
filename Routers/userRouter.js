import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword,
} from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
