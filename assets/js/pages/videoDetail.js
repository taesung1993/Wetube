import axios from "axios";

const isVideoDetail = document.querySelector(".videoDetail-page");

if (isVideoDetail) {
  const needLoginInthumb = document.querySelector(".thumb-Box__needlogin");
  const thumbUp = document.getElementById("videolike");
  const thumbDown = document.getElementById("videohate");

  const incrementView = async () => {
    const videoId = window.location.href.split(
      "http://localhost:9000/video/"
    )[1];
    const res = await axios(`/api/video/${videoId}/view`, {
      method: "POST",
      data: {
        success: true,
        videoId,
      },
    });
    const isSuccess = res.data.success;

    if (isSuccess) {
      const view = document.getElementById("videoDetailView");
      const viewNum = parseInt(view.textContent) * 1 + 1;
      view.textContent = viewNum == 1 ? `${viewNum} view` : `${viewNum} views`;
    } else {
      console.log(res);
    }
  };

  const incrementLike = async (event) => {
    // 좋아요 버튼을 눌렀을 때
    // 이미 좋아요 버튼이 눌러져 있는지 확인
    // isCanceled : 좋아요 버튼이 클릭되어있는 상태에서 누르면 - 취소
    //              좋아요 버튼이 클릭되지않은 상태에서 누르면 - 좋아요
    const videoId = window.location.href.split(
      "http://localhost:9000/video/"
    )[1];
    const isSelected = thumbUp.className;
    const isSelectedUnlike = thumbDown.className;
    const willSwitch = isSelectedUnlike ? true : false;
    const willCancel = isSelected ? true : false;

    // 좋아요 버튼 - 선택 됨
    // 싫어요 버튼 - 선택되있다면 선택을 푼다.
    thumbUp.classList.toggle("selected");
    thumbDown.classList.remove("selected");

    const res = await axios(`/api/video/${videoId}/like`, {
      method: "POST",
      data: {
        success: true,
        videoId,
        willCancel,
        willSwitch,
      },
    });
    const isSuccess = res.data.success;

    if (isSuccess) {
      const isCanceled = res.data.isCanceled;
      const isSwitched = res.data.isSwitched;
      const likeNumEl = document.getElementById("likeNum");
      const likeNum = likeNumEl.textContent * 1;

      if (isCanceled) {
        // 취소 버튼을 눌렀을 때
        likeNumEl.textContent = likeNum - 1;
      } else {
        // 취소 버튼을 누르지 않았을 때
        likeNumEl.textContent = likeNum + 1;
      }
      if (isSwitched) {
        const unlikeNumEl = document.getElementById("unlikeNum");
        const unlikeNum = unlikeNumEl.textContent * 1;
        unlikeNumEl.textContent = unlikeNum - 1;
      }
    }
  };

  const incrementUnlike = async (event) => {
    // 위에 있는 incrementLike 함수와 동작방식 같음

    const videoId = window.location.href.split(
      "http://localhost:9000/video/"
    )[1];
    const isSelected = thumbDown.className;
    const isSelectedUnlike = thumbUp.className;
    const willCancel = isSelected ? true : false;
    const willSwitch = isSelectedUnlike ? true : false;
    // 좋아요 버튼 - 선택 됨
    // 싫어요 버튼 - 선택되있다면 선택을 푼다.
    thumbUp.classList.remove("selected");
    thumbDown.classList.toggle("selected");

    const res = await axios(`/api/video/${videoId}/unlike`, {
      method: "POST",
      data: {
        success: true,
        videoId,
        willCancel,
        willSwitch,
      },
    });
    const isSuccess = res.data.success;

    if (isSuccess) {
      const isCanceled = res.data.isCanceled;
      const isSwitched = res.data.isSwitched;
      const unlikeNumEl = document.getElementById("unlikeNum");
      const unlikeNum = unlikeNumEl.textContent * 1;

      if (isCanceled) {
        // 취소 버튼을 눌렀을 때
        unlikeNumEl.textContent = unlikeNum - 1;
      } else {
        // 취소 버튼을 누르지 않았을 때
        unlikeNumEl.textContent = unlikeNum + 1;
      }
      if (isSwitched) {
        const likeNumEl = document.getElementById("likeNum");
        const likeNum = likeNumEl.textContent * 1;
        likeNumEl.textContent = likeNum - 1;
      }
    }
  };

  const importNextVideos = (nextVideoData) => {
    const nextVideoEl = document.querySelector("#nextVideo");
    const goVideoDetail = nextVideoEl.querySelector("a");
    const video = nextVideoEl.querySelector("video");
    const title = nextVideoEl.querySelector(".title");
    const creator = nextVideoEl.querySelector(".creator");
    const view = nextVideoEl.querySelector(".view");
    const date = nextVideoEl.querySelector(".date");

    goVideoDetail.href = `/video/${nextVideoData._id}`;
    video.src = `${nextVideoData.videoFile}`;
    title.textContent = nextVideoData.title;
    creator.textContent = nextVideoData.creator.name;
    view.textContent =
      nextVideoData.view * 1 <= 1
        ? `${nextVideoData.view} view`
        : `${nextVideoData.view} views`;
    date.textContent = nextVideoData.createdAt.substring(0, 10);
  };

  const registerVideo = (videoData, ul) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    const col1 = document.createElement("div");
    const videoContainer = document.createElement("div");
    const video = document.createElement("video");

    const col2 = document.createElement("div");
    const row1 = document.createElement("div");
    const title = document.createElement("span");
    const row2 = document.createElement("div");
    const creator = document.createElement("span");
    const row3 = document.createElement("div");
    const view = document.createElement("span");
    const date = document.createElement("span");

    li.className = "relatedVideo";
    col1.className = "relatedVideo__col";
    videoContainer.className = "relatedVideo__video-container";
    title.className = "title";

    col2.className = "relatedVideo__col";
    row1.className = "relatedVideo__row";
    row2.className = "relatedVideo__row";
    creator.className = "creator";
    row3.className = "relatedVideo__row";
    view.className = "view";
    date.className = "date";

    a.href = `/video/${videoData._id}`;
    video.src = `${videoData.videoFile}`;
    title.textContent = videoData.title;
    view.textContent =
      videoData.view * 1 < 1
        ? `${videoData.view} view`
        : `${videoData.view} views`;
    creator.textContent = videoData.creator.name;
    date.textContent = videoData.createdAt.substring(0, 10);

    row3.appendChild(view);
    row3.appendChild(date);
    row2.appendChild(creator);
    row1.appendChild(title);
    col2.appendChild(row1);
    col2.appendChild(row2);
    col2.appendChild(row3);

    videoContainer.appendChild(video);
    col1.appendChild(videoContainer);

    a.appendChild(col1);
    a.appendChild(col2);
    li.appendChild(a);
    ul.appendChild(li);
  };

  const importRelatedVideos = (relatedVideos) => {
    const ul = document.getElementById("relatedVideos");

    if (!relatedVideos) return;
    // relatedVideos 확인

    while (relatedVideos.length) {
      const roll = Math.floor(Math.random() * relatedVideos.length);
      const lastIdx = relatedVideos.length - 1;
      const temp = relatedVideos[roll];
      relatedVideos[roll] = relatedVideos[lastIdx];
      relatedVideos[lastIdx] = temp;

      const relatedVideo = relatedVideos.pop();
      registerVideo(relatedVideo, ul);
    }
  };

  const importVideos = async () => {
    // 현재 비디오의 다음 비디오를 불러오는 함수
    // 게시자가 올린 비디오가 한 개 밖에 없을 때, 다음 비디오는 현재 비디오가 된다.
    // 두 개 이상 있을 경우, 현재 비디오의 다음 인덱스 비디오 정보를  api를 통해 받는다.
    const videoId = window.location.href.split(
      "http://localhost:9000/video/"
    )[1];
    const creatorId = document
      .querySelector(".go-profile-link")
      .href.split("/user/")[1];

    const res = await axios(`/api/user/${creatorId}/videos`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        success: true,
        videoId,
        creatorId,
      },
    });
    const isSuccess = res.data.success;

    if (isSuccess) {
      const { nextVideo, relatedVideos } = res.data;
      importNextVideos(nextVideo);
      // importRelatedVideos 호출
      relatedVideos && importRelatedVideos(relatedVideos);
    } else {
      console.log(res);
    }
  };

  const init = () => {
    importVideos();
    if (window.performance.navigation.type !== 2) {
      // 뒤로 가기를 이용해서 videoDetail 페이지에 왔을 경우
      // view를 올리지 않는다.
      incrementView();
    }
    if (!needLoginInthumb) {
      thumbUp.addEventListener("click", incrementLike);
      thumbDown.addEventListener("click", incrementUnlike);
    }
  };

  init();
}
