import axios from "axios";

const commentBox = document.querySelector(".comment-box");
const inputComment = document.getElementById("inputComment");
const updateComments = document.querySelectorAll(
  ".modify-comment.inputComment"
);
const deleteBtns = document.querySelectorAll(".menubar__delete");
const commentNum = document.getElementById("commentNum");

let isUpdating = false;
let preTextarea = null;

const deleteComment = async (event) => {
  const commentId = event.path[6].id;
  const videoId = window.location.href.split("http://localhost:9000/video/")[1];
  const commentList = event.path[7];
  const comment = event.path[6];

  const res = await axios(`/api/video/${videoId}/comment`, {
    method: "DELETE",
    data: {
      success: true,
      commentId,
      videoId,
    },
  });
  const isSuccess = res.data.success;

  if (isSuccess) {
    // 댓글 수 1 감소
    commentNum.textContent = commentNum.textContent * 1 - 1;
    commentList.removeChild(comment);
  }
};

const updateComment = async (
  textarea,
  commentId,
  modifyBox,
  commentContent,
  modifyBtnBox
) => {
  // update 작업 axious 이용할 것!
  const id = window.location.href.split("http://localhost:9000/video/")[1];
  const changeValue = textarea.value;
  textarea.value = "";
  const res = await axios(`/api/video/${id}/comment`, {
    method: "PUT",
    data: {
      success: true,
      msg: changeValue,
      commentId: commentId,
    },
  });
  const resData = res.data;
  if (resData.success) {
    commentContent.textContent = resData.data;
    modifyBox.classList.add("hidden");
    commentContent.classList.remove("hidden");
    modifyBtnBox.classList.remove("hidden");
  }
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

    avatar.src = `${commentInfo.creator.avatar}`;
    creator.textContent = commentInfo.creator.name;
    date.textContent = commentInfo.createdAt.substring(0, 10);
    content.textContent = commentInfo.data;
    commentNum.innerText = commentNum.innerText * 1 + 1;
    avatarLink.href = `/user/${commentInfo.creator.id}`;
    nameLink.href = `/user/${commentInfo.creator.id}`;
    newComment.id = commentInfo.id;

    newComment.classList.remove("hidden");
  }
};

const setTextareaHeight = (event) => {
  event.currentTarget.style.height = "35px";
  event.currentTarget.style.height = `${event.target.scrollHeight}px`;
};

const resetEnter = (event) => {
  const textarea = event.currentTarget;
  const modifyBox = event.path[1];
  const modifyBtn = event.path[1].querySelector(".btn-modify");
  const cancelBtn = event.path[1].querySelector(".btn-cancel");
  const commentContent = event.path[2].querySelector(".comment__content");
  const modifyBtnBox = event.path[3].querySelector(".commentMenuBtn-box");
  const commentId = event.path[4].id;

  if (!isUpdating) {
    preTextarea = textarea.value;
    isUpdating = true;
  }

  const goUpdateComment = (event) => {
    event.stopImmediatePropagation();
    if (preTextarea !== textarea.value) {
      updateComment(
        textarea,
        commentId,
        modifyBox,
        commentContent,
        modifyBtnBox
      );
      isUpdating = false;
    } else {
      textarea.focus();
    }
  };

  const cancelUpdate = () => {
    isUpdating = false;
  };

  if (!event.shiftKey && event.keyCode == 13) {
    event.preventDefault();
    if (textarea === inputComment) {
      writeComment();
      event.currentTarget.value = "";
    } else if (textarea.className === "modify-comment inputComment") {
      if (preTextarea === textarea.value) {
        textarea.focus();
      } else {
        updateComment(
          textarea,
          commentId,
          modifyBox,
          commentContent,
          modifyBtnBox
        );
        isUpdating = false;
      }
    }
  } else {
    if (modifyBtn) {
      modifyBtn.addEventListener("click", goUpdateComment);
      cancelBtn.addEventListener("click", cancelUpdate);
    }
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
  if (deleteBtns) {
    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", deleteComment);
    });
  }
};

if (commentBox) {
  init();
}
