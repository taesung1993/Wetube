// gloalRouter

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// videoRouter

const UPLOAD = "/upload";
const VIDEO = "/video";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit-video";
const DELETE_VIDEO = "/:id/delete";

// userRouter

const USER = "/user";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/:id/edit-profile";
const CHANGE_PASSWORD = "/:id/change-password";
const ME = "/me";

// github
const GITHUB = "/auth/github";
const GITHUB_CB = "/auth/github/callback";

// gogle
const GOOGLE = "/auth/google";
const GOOGLE_CB = "/auth/google/callback";

// api
const API = "/api";
const API_VIDEO_VIEW = "/video/:id/view";
const API_VIDEO_LIKE = "/video/:id/like";
const API_VIDEO_UNLIKE = "/video/:id/unlike";
const API_VIDEO_COMMENT = "/video/:id/comment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  upload: UPLOAD,
  video: VIDEO,
  videoDetail: (id) => {
    return id ? `/video/${id}` : VIDEO_DETAIL;
  },
  editVideo: (id) => {
    return id ? `/video/${id}/edit-video` : EDIT_VIDEO;
  },
  deleteVideo: (id) => {
    return id ? `/video/${id}/delete` : DELETE_VIDEO;
  },
  user: USER,
  me: ME,
  userDetail: (id) => {
    return id ? `/user/${id}` : VIDEO_DETAIL;
  },
  editProfile: (id) => {
    return id ? `/user/${id}/edit-profile` : EDIT_PROFILE;
  },
  changePassword: (id) => {
    return id ? `/user/${id}/change-password` : CHANGE_PASSWORD;
  },
  github: GITHUB,
  githubCb: GITHUB_CB,
  google: GOOGLE,
  googleCb: GOOGLE_CB,
  api: API,
  apiVideoComment: API_VIDEO_COMMENT,
  apiVideoView: API_VIDEO_VIEW,
  apiVideoLike: API_VIDEO_LIKE,
  apiVideoUnlike: API_VIDEO_UNLIKE,
};

export default routes;
