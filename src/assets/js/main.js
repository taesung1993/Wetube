import "../scss/styles.scss";
import "./pages/videoDetail";
import "./pages/editProfile";
import "./partials/videoPlayer.js";
import "./partials/ctrlComment.js";
import "./partials/setCommentMenu.js";
import "./partials/followCtrl.js";
import "./partials/header.js";
import "./responsive/pages/videoDetail.js";

window.onpageshow = (event) => {
  if (event.persited || window.performance.navigation.type === 2) {
    // 뒤로가기로 페이지 이동 시, 새로고침!
    window.location.reload();
  }
};
