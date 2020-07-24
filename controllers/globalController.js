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

// upload Part

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "UPLOAD" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  try {
    rgb(0, 206, 201);
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

// Github Login Part

export const githubLogin = passport.authenticate("github");
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, email, name },
  } = profile;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      githubId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// Google Login Part

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});
export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};
export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.googleId = sub;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({ name, email, googleId: sub });
    return cb(null, newUser);
  } catch (error) {
    cb(error);
  }
};

// join Part

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

// search part

export const search = (req, res) => {
  res.render("search", { pageTitle: "SEARCH" });
};

// login part

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "LOGIN" });
};
export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

// logout part

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
