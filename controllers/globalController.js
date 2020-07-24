import passport from "passport";
import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";

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

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "JOIN" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, verifyPassword },
  } = req;
  if (password !== verifyPassword) {
    res.status(400);
    res.redirect(routes.join);
  } else {
    try {
      const newUser = await User({ name, email });
      await User.register(newUser, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.join);
    }
  }
};

export const search = (req, res) => {
  res.render("search", { pageTitle: "SEARCH" });
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "LOGIN" });
};

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
