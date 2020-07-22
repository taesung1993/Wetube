import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddles = (req, res, next) => {
  res.locals.siteName = "WETUBE";
  res.locals.routes = routes;
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
