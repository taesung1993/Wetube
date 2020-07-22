import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  let videos = [];
  try {
    videos = await Video.find({});
  } catch (error) {
    console.log(error);
  } finally {
    res.render("home", { pageTitle: "HOME", videos });
  }
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "UPLOAD" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  try {
    const newVideo = await Video.create({
      videoFile: path,
      title,
      description,
    });
    res.redirect(routes.videoDetail(newVideo._id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const join = (req, res) => {
  res.render("join", { pageTitle: "JOIN" });
};

export const search = (req, res) => {
  res.render("search", { pageTitle: "SEARCH" });
};

export const login = (req, res) => {
  res.render("login", { pageTitle: "LOGIN" });
};
