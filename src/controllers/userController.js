import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";
import { deleteS3Obj } from "../middlewares";

export const meDetail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "USER DETAIL", me: user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
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
    let avatar = file ? file.location : avatarUrl;
    const willAvatarDel = Boolean(isAvatarDel);
    const avatarkeyInAws = willAvatarDel
      ? avatarUrl.split(
          "https://wetubesuperstorage.s3.ap-northeast-2.amazonaws.com/avatar/"
        )[1]
      : null;
    console.log(avatarkeyInAws);
    willAvatarDel &&
      deleteS3Obj("wetubesuperstorage", `avatar/${avatarkeyInAws}`);
    avatar = willAvatarDel ? "/images/basicAvatar.png" : avatar;
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
  let relatedVideos = [];
  try {
    if (success === false) throw "the req is failed.";

    const videos = await Video.find(
      {},
      { title: 1, videoFile: 1, createdAt: 1, view: 1 }
    )
      .where("creator")
      .equals(creatorId)
      .populate({
        path: "creator",
        select: ["name"],
        populate: {
          path: "following",
          select: { videos: 1, _id: 0 },
          populate: {
            path: "videos",
            select: ["videoFile", "view", "title", "createdAt"],
            populate: {
              path: "creator",
              select: ["name"],
            },
          },
        },
      });
    const currentVideoIdx = videos.findIndex((video) => video.id == videoId);
    //  next 비디오 조건
    // 현재 비디오 다음에 비디오가 존재할 때 -> 다음 비디오가 된다.
    // 현재 비디오가 마지막 비디오일 때 -> 다음 비디오는 처음 비디오가 된다.
    const nextVideo =
      currentVideoIdx == videos.length - 1
        ? videos[0]
        : videos[currentVideoIdx + 1];

    const creatorCurFollowing = videos[currentVideoIdx].creator.following;

    relatedVideos =
      creatorCurFollowing &&
      creatorCurFollowing.reduce((result, item, _) => {
        return result.concat(...item.videos);
      }, []);
    relatedVideos =
      nextVideo._id == videoId ? relatedVideos : [nextVideo, ...relatedVideos];

    res.json({
      success: true,
      nextVideo,
      relatedVideos,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

export const isFollowed = async (req, res) => {
  const { body } = req;
  try {
    if (!req.user) throw "you must login";
    const findId = body.findId;
    const userId = req.user.id;

    const user = await User.findById(findId);
    const isfollowed = user.followers.includes(userId);
    res.json({
      success: true,
      isfollowed,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

export const incrementUserFollow = async (req, res) => {
  const {
    body: { success, willFollowId },
    user,
  } = req;
  try {
    if (success === false) {
      throw "The req is failed.";
    }
    if (willFollowId == user.id) {
      throw "The logged user's id is same as id that you will follow.";
    }

    await User.findOneAndUpdate(
      { _id: willFollowId },
      {
        $push: {
          followers: user.id,
        },
      }
    );

    await User.findOneAndUpdate(
      { _id: user.id },
      {
        $push: {
          following: willFollowId,
        },
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

export const decrementUserFollow = async (req, res) => {
  const {
    body: { success, willUnfollowId },
    user,
  } = req;
  try {
    if (success === false) {
      throw "The req is failed.";
    }
    if (willUnfollowId == user.id) {
      throw "The logged user's id is same as id that you will follow.";
    }

    await User.findOneAndUpdate(
      { _id: willUnfollowId },
      {
        $pull: {
          followers: user.id,
        },
      }
    );

    await User.findOneAndUpdate(
      { _id: user.id },
      {
        $pull: {
          following: willFollowId,
        },
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};
