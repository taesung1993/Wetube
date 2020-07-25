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

export const changePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
};
