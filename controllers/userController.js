import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";

export const meDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "USER DETAIL", me: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    console.log(user);
    res.render("userDetail", { pageTitle: "USER DETAIL", me: user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
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

export const importUserVideos = async (req, res) => {
  const {
    body: { success, videoId, creatorId },
  } = req;
  try {
    if (success === false) throw "the req is failed.";

    const videos = await Video.find()
      .where("creator")
      .equals(creatorId)
      .populate("creator");
    const currentVideoIdx = videos.findIndex((video) => video.id == videoId);

    //  next 비디오 조건
    // 현재 비디오 다음에 비디오가 존재할 때 -> 다음 비디오가 된다.
    // 현재 비디오가 마지막 비디오일 때 -> 다음 비디오는 처음 비디오가 된다.

    const nextVideo =
      currentVideoIdx == videos.length - 1
        ? videos[0]
        : videos[currentVideoIdx + 1];

    res.json({
      success: true,
      nextVideo,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};
