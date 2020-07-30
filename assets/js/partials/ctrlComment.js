import axios from "axios";

const commentBox = document.querySelector(".comment-box");
const inputComment = document.getElementById("inputComment");
const updateComments = document.querySelectorAll(
  ".modify-comment.inputComment"
);

let isUpdating = false;
let preTextarea = null;

const updateComment = async (textarea) => {
  // update 작업 axious 이용할 것!
  const id = window.location.href.split("http://localhost:9000/video/")[1];
  console.log(textarea.value);
  textarea.value = "";
};

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
    const avatarLink = document.getElementById("fromAvatartoProfile");
    const nameLink = document.getElementById("fromNamertoProfile");

    avatar.src = `/${commentInfo.creator.avatar}`;
    creator.textContent = commentInfo.creator.name;
    date.textContent = commentInfo.createdAt.substring(0, 10);
    content.textContent = commentInfo.data;
    commentNum.innerText = commentNum.innerText * 1 + 1;
    avatarLink.href = `/user/${commentInfo.creator.id}`;
    nameLink.href = `/user/${commentInfo.creator.id}`;

    newComment.classList.remove("hidden");
  }
};

const setTextareaHeight = (event) => {
  event.currentTarget.style.height = "35px";
  event.currentTarget.style.height = `${event.target.scrollHeight}px`;
};

const resetEnter = (event) => {
  const textarea = event.currentTarget;
  const modifyBtn = event.path[1].querySelector(".btn-modify");
  const cancelBtn = event.path[1].querySelector(".btn-cancel");

  if (!isUpdating) {
    preTextarea = textarea.value;
    isUpdating = true;
  }

  const goUpdateComment = (event) => {
    event.stopImmediatePropagation();
    updateComment(textarea);
    isUpdating = false;
  };

  const cancelUpdate = () => {
    isUpdating = false;
  };

  if (!event.shiftKey && event.keyCode == 13) {
    event.preventDefault();
    if (textarea === inputComment) {
      writeComment();
    } else if (textarea.className === "modify-comment inputComment") {
      if (preTextarea === textarea.value) {
        textarea.focus();
      } else {
        updateComment(textarea);
        isUpdating = false;
      }
    }
  } else {
    modifyBtn.addEventListener("click", goUpdateComment);
    cancelBtn.addEventListener("click", cancelUpdate);
  }
};

const init = () => {
  if (inputComment) {
    inputComment.addEventListener("keydown", resetEnter);
    inputComment.addEventListener("keyup", setTextareaHeight);
  }
  if (updateComments) {
    updateComments.forEach((updateComment) => {
      updateComment.addEventListener("keydown", resetEnter);
      updateComment.addEventListener("keyup", setTextareaHeight);
    });
  }
};

if (commentBox) {
  init();
}
