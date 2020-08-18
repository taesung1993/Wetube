import routes from "./routes";
import multer, { memoryStorage } from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetubesuperstorage/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetubesuperstorage/avatar",
  }),
});

export const insertS3Obj = (stream) => {
  const params = {
    Bucket: "wetubesuperstorage",
    Key: "thumbnails",
    Body: stream,
  };
  s3.putObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

export const deleteS3Obj = (Bucket, Key) => {
  const params = {
    Bucket,
    Key,
  };
  s3.deleteObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

export const localMiddles = (req, res, next) => {
  res.locals.siteName = "WETUBE";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
