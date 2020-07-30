import axios from "axios";

const commentBox = document.querySelector(".comment-box");
const inputComment = document.getElementById("inputComment");
const updateComment = document.querySelector(".modify-comment.inputComment");

const writeComment = async () => {
  const id = window.location.href.split("http://localhost:9000/video/")[1];
  const msg = inputComment.value;
  const res = await axios(`/api/video/${id}/comment`, {
    method: "POST",
    data: {
      success: true,
      msg,
    },
  });

  if (res.data.success) {
    const commentInfo = res.data.data;
    const commentNum = document.getElementById("commentNum");
    const newComment = document.getElementById("newComment");
    const avatar = document.getElementById("commentAvatar");
    const creator = document.getElementById("commentCreator");
    const date = document.getElementById("commentDate");
    const content = document.getElementById("commentContent");

    avatar.src = `/${commentInfo.creator.avatar}`;
    creator.textContent = commentInfo.creator.name;
    date.textContent = commentInfo.createdAt.substring(0, 10);
    content.textContent = commentInfo.data;
    commentNum.innerText = commentNum.innerText * 1 + 1;

    newComment.classList.remove("hidden");
  }
};

const setTextareaHeight = (event) => {
  event.currentTarget.style.height = "35px";
  event.currentTarget.style.height = `${event.target.scrollHeight}px`;
};

const resetEnter = (event) => {
  if (!event.shiftKey && event.keyCode == 13) {
    event.preventDefault();
    if (event.currentTarget === inputComment) {
      writeComment();
    } else if (event.currentTarget === updateComment) {
      console.log("업데이트!");
    }
    event.currentTarget.value = "";
  }
};

const init = () => {
  if (inputComment) {
    inputComment.addEventListener("keydown", resetEnter);
    inputComment.addEventListener("keyup", setTextareaHeight);
  }
  if (updateComment) {
    updateComment.addEventListener("keydown", resetEnter);
    updateComment.addEventListener("keyup", setTextareaHeight);
  }
};

if (commentBox) {
  init();
}
