const videoContainer = document.querySelector(".videoDetail__videoPlayer");
const videoPlayer = document.querySelector("video");
const videoControlBar = document.querySelector(".videoPlayer__control-bar");

// 재생 관련 변수들
const playBtn = document.getElementById("videoPlay");

// 프로그래스 바 변수들
const progressbarRange = document.querySelector(
  ".videoPlayer__col:nth-child(2)"
);
const currentProgress = document.querySelector(".current-rate");
const ctrlProgressbar = document.getElementById("currentRateBtn");

// 볼륨 관련 변수들
const volBtn = document.getElementById("volumeCtrl");
const volArea = document.querySelector(".volume-control");
const volTrack = document.querySelector(".volume-bar__track");
const volCurrentLevel = document.querySelector(".volume-control .current-rate");
const volCtrlBtn = document.getElementById("volumeCtrlBtn");

// 스크린 버튼 변수
const screenCtrlBtn = document.getElementById("screenSizeCtrl");

const videoThumbnails = [];
let currentProgressBarRate = 0;
let isVolCtrl = false;
let isProgressCtrl = false;

let curentVolLevel = 0.5;

// 볼륨 컨트롤 함수들

const showVolCtrl = (event) => {
  volArea.classList.remove("hidden");
};

const hideVolCtrl = () => {
  volArea.classList.add("hidden");
  isVolCtrl = false;
};

const handleMuted = () => {
  const icon = document.querySelector("#volumeCtrl i");
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    icon.className = "fas fa-volume-up";
    videoPlayer.volume = curentVolLevel;
    volCurrentLevel.style.height = `${curentVolLevel * 100}%`;
  } else {
    videoPlayer.muted = true;
    icon.className = "fas fa-volume-mute";
    videoPlayer.volume = 0;
    volCurrentLevel.style.height = "0%";
  }
};

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
    curentVolLevel = currentRate / 100;
    videoPlayer.volume = currentVolLevel;
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

const handleSpacebarPlay = (event) => {
  const icon = document.querySelector("#videoPlay i");
  if (event.keyCode == 32) {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
      icon.className = "fas fa-pause";
    } else if (videoPlayer.played) {
      videoPlayer.pause();
      icon.className = "fas fa-play";
    }
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

const goFullScreen = () => {
  const icon = document.querySelector("#screenSizeCtrl i");
  const exitFullScreen = () => {
    icon.className = "fas fa-expand";
    document.webkitExitFullscreen();
    screenCtrlBtn.addEventListener("click", goFullScreen);
  };
  const handleExitScreen = () => {
    // ESC로 전체화면 모드를 끌 때 발생하는 이벤트
    if (!document.webkitIsFullScreen) {
      icon.className = "fas fa-expand";
      screenCtrlBtn.addEventListener("click", goFullScreen);
    }
  };
  videoContainer.requestFullscreen();
  icon.className = "fas fa-compress";
  document.addEventListener("fullscreenchange", handleExitScreen);
  screenCtrlBtn.addEventListener("click", exitFullScreen);
  screenCtrlBtn.removeEventListener("click", goFullScreen);
};

const startProgressCtrl = () => {
  isProgressCtrl = true;
};

const moveProgress = () => {
  if (isProgressCtrl) {
    const currentTimeEl = document.getElementById("currentTime");
    const totalTime = videoPlayer.duration;
    const currentTime = totalTime * currentProgressBarRate;
    const currentTimeString = dateformat(currentTime);

    videoPlayer.currentTime = currentTime;
    currentTimeEl.innerText = currentTimeString;
    isProgressCtrl = false;
  }
};

const setProgressCtrl = (event) => {
  isProgressCtrl = true;
  if (isProgressCtrl) {
    const start = parseInt(progressbarRange.getBoundingClientRect().left);
    const end = parseInt(progressbarRange.getBoundingClientRect().width - 20);
    let pointer = (start - event.clientX + 10) * -1;
    currentProgressBarRate = (pointer / end).toFixed(2);
    let percent = currentProgressBarRate * 100;

    if (percent < 0) {
      percent = 0;
    } else if (percent > 100) {
      percent = 100;
    }

    currentProgress.style.width = `${percent}%`;
  }
};

const endProgressCtrl = () => {
  isProgressCtrl = false;
};

const showVideoCtrl = () => {
  videoControlBar.classList.remove("hidden");
  window.addEventListener("keydown", handleSpacebarPlay);
};

const hideVideoCtrl = () => {
  videoControlBar.classList.add("hidden");
  window.removeEventListener("keydown", handleSpacebarPlay);
};

const init = () => {
  // 비디오 로딩 함수
  videoPlayer.onloadedmetadata = handleLoading;
  videoPlayer.onloadedmetadata();

  // 비디오 컨트롤 바 show/hide
  videoContainer.addEventListener("mouseover", showVideoCtrl);
  videoContainer.addEventListener("mouseleave", hideVideoCtrl);

  // 비디오 프로그래스 바 함수
  videoPlayer.addEventListener("timeupdate", updateVideoTime);
  progressbarRange.addEventListener("mousedown", startProgressCtrl);
  progressbarRange.addEventListener("mousemove", setProgressCtrl);
  progressbarRange.addEventListener("mouseup", moveProgress);
  progressbarRange.addEventListener("mouseleave", endProgressCtrl);

  // 비디오 플레이 함수
  // window.addEventListener("keydown", handleSpacebarPlay);
  playBtn.addEventListener("click", handleVideoPlay);

  // 볼륨 이벤트 함수
  volBtn.addEventListener("mouseover", showVolCtrl);
  volBtn.addEventListener("click", handleMuted);
  volArea.addEventListener("mousedown", startVolCtrl);
  volArea.addEventListener("mousemove", setVolLevel);
  volArea.addEventListener("mouseup", endVolCtrl);
  volArea.addEventListener("mouseleave", hideVolCtrl);

  // 스크린 관련 함수
  screenCtrlBtn.addEventListener("click", goFullScreen);
};

if (videoContainer) {
  videoPlayer.volume = 0.5;
  init();
}
