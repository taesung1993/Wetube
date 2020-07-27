const videoContainer = document.querySelector(".videoDetail__videoPlayer");
const videoPlayer = document.querySelector("video");

// 재생 관련 변수들
const playBtn = document.getElementById("videoPlay");

// 프로그래스 바 변수들
const currentProgress = document.querySelector(".current-rate");

// 볼륨 관련 변수들
const volArea = document.querySelector(".volume-control");
const volTrack = document.querySelector(".volume-bar__track");
const volCurrentLevel = document.querySelector(".volume-control .current-rate");
const volCtrlBtn = document.getElementById("volumeCtrlBtn");

// 스크린 버튼 변수
const screenCtrlBtn = document.getElementById("screenSizeCtrl");

let isVolCtrl = false;

// 볼륨 컨트롤 함수들

const endVolCtrl = () => {
  isVolCtrl = false;
};
const setVolLevel = (event) => {
  if (isVolCtrl) {
    const start = parseInt(volArea.getBoundingClientRect().bottom);
    let currentRate = ((start - event.clientY - 10) / 60) * 100;
    if (currentRate > 100) {
      currentRate = 100;
    } else if (currentRate < 0) {
      currentRate = 0;
    }
    volCurrentLevel.style.height = `${currentRate}%`;
  }
};
const startVolCtrl = () => {
  isVolCtrl = true;
};

const handleVideoPlay = () => {
  const icon = document.querySelector("#videoPlay i");
  if (videoPlayer.paused) {
    videoPlayer.play();
    icon.className = "fas fa-pause";
  } else if (videoPlayer.played) {
    videoPlayer.pause();
    icon.className = "fas fa-play";
  }
};

const dateformat = (time) => {
  let hour = parseInt(time / 3600);
  let minute = parseInt((time % 3600) / 60);
  let second = parseInt((time % 3600) % 60);

  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;

  return `${hour}:${minute}:${second}`;
};

const setTotalTime = () => {
  const totalTime = document.getElementById("endTime");
  const totalTimeString = dateformat(videoPlayer.duration);
  totalTime.innerText = totalTimeString;
};

const handleLoading = () => {
  setTotalTime();
};

const updateProgressbar = (currentTime) => {
  const totalTime = videoPlayer.duration;
  const percent = ((currentTime / totalTime) * 100).toFixed(2);
  currentProgress.style.width = `${percent}%`;
};

const updateVideoTime = () => {
  const currentTime = document.getElementById("currentTime");
  const currentTimeString = dateformat(videoPlayer.currentTime);
  currentTime.innerText = currentTimeString;

  updateProgressbar(videoPlayer.currentTime);

  if (videoPlayer.ended) {
    const icon = document.querySelector("#videoPlay i");
    icon.className = "fas fa-play";
    videoPlayer.currentTime = 0;
    currentTime.innerText = "00:00:00";
  }
};

const init = () => {
  // 비디오 로딩 함수
  videoPlayer.onloadedmetadata = handleLoading;
  videoPlayer.onloadedmetadata();

  // 비디오 프로그래스 바 함수
  videoPlayer.addEventListener("timeupdate", updateVideoTime);

  // 비디오 플레이 함수
  playBtn.addEventListener("click", handleVideoPlay);
  // 볼륨 이벤트 함수
  volArea.addEventListener("mousedown", startVolCtrl);
  volArea.addEventListener("mousemove", setVolLevel);
  volArea.addEventListener("mouseup", endVolCtrl);
  volArea.addEventListener("mouseleave", endVolCtrl);

  // 스크린 관련 함수
};

if (videoContainer) {
  init();
}
