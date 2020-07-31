import express from "express";
import routes from "../routes";
import {
  addComment,
  putComment,
  deleteComment,
} from "../controllers/commentController";

export const apiRouter = express.Router();

apiRouter.post(routes.apiVideoComment, addComment);
apiRouter.put(routes.apiVideoComment, putComment);
apiRouter.delete(routes.apiVideoComment, deleteComment);
