import axios from "axios";

const commentBox = document.querySelector(".comment-box");
const inputComment = document.getElementById("inputComment");

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

  console.log(res);
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
  inputComment.style.height = "35px";
  inputComment.style.height = `${event.target.scrollHeight}px`;
};

const resetEnter = (event) => {
  if (!event.shiftKey && event.keyCode == 13) {
    event.preventDefault();
    writeComment();
    inputComment.value = "";
  }
};

const init = () => {
  inputComment.addEventListener("keydown", resetEnter);
  inputComment.addEventListener("keyup", setTextareaHeight);
};

if (commentBox) {
  init();
}
