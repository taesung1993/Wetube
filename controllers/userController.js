import routes from "../routes";
import User from "../models/User";

export const meDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "USER DETAIL", me: req.user });
};

export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "USER DETAIL" });
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "EDIT PROFILE", me: req.user });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, isAvatarDel },
    file,
    user: { _id, avatarUrl },
  } = req;

  try {
    let avatar = file ? file.path : avatarUrl;
    avatar = Boolean(isAvatarDel) ? "images/basicAvatar.png" : avatar;
    await User.findOneAndUpdate(
      { _id: _id },
      { name: name, avatarUrl: avatar }
    );
    res.redirect(`/user${routes.me}`);
  } catch (error) {
    console.log(error);
    res.redirect(routes.editProfile(_id));
  }
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "CHANGE PASSWORD", me: req.user });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { currentPassword, newPassword, verifyPassword },
    user: { _id },
  } = req;
  try {
    if (newPassword !== verifyPassword) {
      res.status(400);
      res.redirect(routes.changePassword(_id));
      return;
    }
    await req.user.changePassword(currentPassword, newPassword);
    res.redirect(`/user${routes.me}`);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.changePassword(_id));
  }
};
