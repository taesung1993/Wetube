import Video from "../models/Video";
import User from "../models/User";
import routes from "../routes";

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  let isSelectedLike = null;
  let isSelectedUnlike = null;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    if (req.user) {
      isSelectedLike = video.likes.includes(req.user.id);
      isSelectedUnlike = video.unlikes.includes(req.user.id);
    }
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
      isSelectedLike,
      isSelectedUnlike,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: "EDIT VIDEO", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.videoDetail(id));
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.editProfile(id));
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
    await User.findOneAndUpdate(
      { _id: user.id },
      {
        $pull: {
          videos: id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(routes.home);
  }
};

export const postView = async (req, res) => {
  const { body } = req;
  try {
    const isSuccess = body.success || null;
    const isUser = req.user ? req.user.id : null;
    const videoId = body.videoId;
    const video = await Video.findById(videoId);

    if (!isSuccess) {
      // req 요청을 제대로 받지 못할 경우, 에러처리
      throw "the req is failed";
    }

    if (isUser == video.creator) {
      // 현재 접속해있는 id값과 비디오 게시자 id가 같은 경우,
      // view 값을 그대로 유지한다.
      return;
    } else {
      // 로그인되어있지 않거나, 접속한 유저와 비디오 게시자가 다를 때
      // view 값을 올린다.
      video.view += 1;
      video.save();
      res.json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

export const postVideoLike = async (req, res) => {
  const {
    body: { willCancel, willSwitch, success, videoId },
    user,
  } = req;
  try {
    if (success === false) throw "the req is failed";

    if (willCancel === true && willSwitch === false) {
      // unlike가 선택되어있지 않은상태에서 like를 취소하려하는 경우
      // like를 1 내린다.
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          $pull: {
            likes: user.id,
          },
        }
      );
    } else if (willCancel === false && willSwitch === true) {
      // unlike가 선택되지 않은 상태에서 like를 올리려하는 경우
      // like를 1 올리고, unlike를 1 내려야한다.
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          $push: {
            likes: user.id,
          },
          $pull: {
            unlikes: user.id,
          },
        }
      );
    } else {
      // unlike, like모두 선택되지 않은 경우에서 like를 올리려 하는 경우
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          $push: {
            likes: user.id,
          },
        }
      );
    }

    res.json({
      success: true,
      isCanceled: willCancel,
      isSwitched: willSwitch,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

export const postVideoUnlike = async (req, res) => {
  const {
    body: { willCancel, willSwitch, success, videoId },
    user,
  } = req;
  try {
    if (success === false) throw "the req is failed";

    if (willCancel === true && willSwitch === false) {
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          $pull: {
            unlikes: user.id,
          },
        }
      );
    } else if (willCancel === false && willSwitch === true) {
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          $push: {
            unlikes: user.id,
          },
          $pull: {
            likes: user.id,
          },
        }
      );
    } else {
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          $push: {
            unlikes: user.id,
          },
        }
      );
    }

    res.json({
      success: true,
      isCanceled: willCancel,
      isSwitched: willSwitch,
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
