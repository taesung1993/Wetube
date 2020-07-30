const commentList = document.querySelector(".comment-list");
const comments = document.querySelectorAll("li.comment");
const menuBtns = document.querySelectorAll(".commentMenuBtn");
let isShowingMenubar = false;
let preMenuBtn = null;
let preMenubar = null;

const showSetMenu = (event) => {
  const comment = event.currentTarget;
  const menuBtnBox = comment.querySelector(".commentMenuBtn-box");
  const menuBtn = comment.querySelector(".commentMenuBtn");
  const menubar = comment.querySelector(".menubar");
  const menuBtnEffect = menuBtn.querySelector(".commentMenuBtn__effect");
  const modifyBtn = comment.querySelector(".menubar__modify");
  const modifyBox = comment.querySelector(".modify-comment-box");
  const commentContent = comment.querySelector(".comment__content");

  const showMenubar = (e) => {
    e.stopImmediatePropagation();
    menuBtnEffect.style.animation = "spread 0.2s linear";

    if (preMenubar === null || preMenubar === menubar) {
      if (isShowingMenubar) {
        menubar.classList.add("hidden");
        isShowingMenubar = false;
      } else {
        menubar.classList.remove("hidden");
        preMenuBtn = menuBtn;
        preMenubar = menubar;
        isShowingMenubar = true;
      }
    } else {
      // preMenubar와 munubar가 일치하지 않을 때!
      if (isShowingMenubar) {
        // preMenubar가 켜져있는 상태
        preMenubar.classList.add("hidden");
        preMenuBtn.classList.add("hidden");
        menubar.classList.remove("hidden");
        preMenuBtn = menuBtn;
        preMenubar = menubar;
      } else {
        //preMenubar가 꺼져있는 상태
        menubar.classList.remove("hidden");
        preMenuBtn = menuBtn;
        preMenubar = menubar;
        isShowingMenubar = true;
      }
    }
  };

  const unsetAnimation = () => {
    menuBtnEffect.style.animation = "";
  };

  const hideMenubar = (e) => {
    e.stopImmediatePropagation();
    if (preMenubar !== null && isShowingMenubar) {
      if (!preMenuBtn.contains(e.target) && !preMenubar.contains(e.target)) {
        preMenubar.classList.add("hidden");
        preMenuBtn.classList.add("hidden");
        isShowingMenubar = false;
      }
    }
  };

  const showModifyBox = (e) => {
    e.stopImmediatePropagation();
    const textarea = modifyBox.querySelector("textarea");
    const cancelBtn = modifyBox.querySelector(".btn-cancel");
    menuBtnBox.classList.add("hidden");
    commentContent.classList.add("hidden");
    modifyBox.classList.remove("hidden");
    preMenubar.classList.add("hidden");
    preMenuBtn.classList.add("hidden");

    textarea.value = commentContent.textContent;
    isShowingMenubar = false;

    const hideModifyBox = () => {
      modifyBox.classList.add("hidden");
      menuBtnBox.classList.remove("hidden");
      commentContent.classList.remove("hidden");
    };

    cancelBtn.addEventListener("click", hideModifyBox);
  };

  menuBtn.classList.remove("hidden");
  document.body.addEventListener("mousedown", hideMenubar);
  menuBtn.addEventListener("mousedown", unsetAnimation);
  menuBtn.addEventListener("mouseleave", unsetAnimation);
  menuBtn.addEventListener("mouseup", showMenubar);

  modifyBtn.addEventListener("click", showModifyBox);
};

const hideSetMenu = (event) => {
  const menuBtn = event.currentTarget.querySelector(".commentMenuBtn");
  if (preMenuBtn === null) menuBtn.classList.add("hidden");
  else {
    // 이전에 있던 메뉴 버튼 요소 데이터가 있는 경우
    if (isShowingMenubar) {
      // 이전에 있던 메뉴버튼을 눌러서 메뉴바가 떠 있는 경우
      if (menuBtn === preMenuBtn) {
        // 이전에 있던 메뉴버튼과 현재 누른 메뉴버튼이 같은 경우
        // 값 유지
        menuBtn.classList.remove("hidden");
      } else {
        // 다른 경우
        // 이전에 있던 메뉴버튼은 유지시키고,
        // 현재 있는 메뉴버튼은 사라지게한다.
        preMenuBtn.classList.remove("hidden");
        menuBtn.classList.add("hidden");
      }
    } else menuBtn.classList.add("hidden");
  }
};

if (commentList) {
  comments.forEach((comment) => {
    comment.addEventListener("mouseover", showSetMenu);
    comment.addEventListener("mouseleave", hideSetMenu);
  });
}
