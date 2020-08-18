const isVideoDetail = document.querySelector(".videoDetail-page");

if (isVideoDetail) {
  const relatedVideoSections = document.querySelectorAll(
    ".relatedVideo--Section"
  );

  let mql = window.matchMedia("screen and (max-width:1024px)");
  if (mql.matches) {
    // 윈도우 창이 1024보다 작은 경우
    relatedVideoSections[1].classList.add("hidden");
  } else {
    relatedVideoSections[0].classList.add("hidden");
    // 윈도우 창이 1024보다 큰 경우
  }

  const handleDisplayVideos = (event) => {
    const width = event.currentTarget.innerWidth;
    if (width > 1024) {
      relatedVideoSections[0].classList.add("hidden");
      relatedVideoSections[1].classList.remove("hidden");
    } else {
      relatedVideoSections[0].classList.remove("hidden");
      relatedVideoSections[1].classList.add("hidden");
    }
  };

  window.addEventListener("resize", handleDisplayVideos);
}
