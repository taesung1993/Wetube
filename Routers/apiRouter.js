import express from "express";
import routes from "../routes";
import { addComment } from "../controllers/commentController";

export const apiRouter = express.Router();

apiRouter.post(routes.apiVideoComment, addComment);
