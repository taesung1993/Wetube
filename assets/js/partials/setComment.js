const commentList = document.querySelector(".comment-list");
const comments = document.querySelectorAll("li.comment");
const menuBtns = document.querySelectorAll(".commentMenuBtn");

const showSetMenu = (event) => {
  const menuBtn = event.currentTarget.querySelector(".commentMenuBtn");
  const menuBtnEffect = menuBtn.querySelector(".commentMenuBtn__effect");
  const setAnimation = (e) => {
    menuBtnEffect.style.animation = "spread 0.2s linear";
  };
  const unsetAnimation = (e) => {
    menuBtnEffect.style.animation = "";
  };
  menuBtn.classList.remove("hidden");
  menuBtn.addEventListener("mousedown", unsetAnimation);
  menuBtn.addEventListener("mouseleave", unsetAnimation);
  menuBtn.addEventListener("mouseup", setAnimation);
};

const hideSetMenu = (event) => {
  const menuBtn = event.currentTarget.querySelector(".commentMenuBtn");
  menuBtn.classList.add("hidden");
};

if (commentList) {
  comments.forEach((comment) => {
    comment.addEventListener("mouseover", showSetMenu);
    comment.addEventListener("mouseleave", hideSetMenu);
  });
}
