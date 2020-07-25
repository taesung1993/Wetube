const editProfile = document.querySelector(".editProfile-page");
const isdeleteAvatar = document.getElementById("isdeleteAvatar");
let isDeleted = false;

const init = () => {
  const avatarDelBtn = document.getElementById("deleteAvatarBtn");

  const handleDelClicked = () => {
    if (isDeleted) {
      // 삭제 버튼 클릭 안했을 때
      isDeleted = false;
      avatarDelBtn.value = "Delete Avatar: False";
      isdeleteAvatar.value = "";
      avatarDelBtn.style.backgroundColor = "#2ecc71";
    } else {
      // 삭제 버튼 클릭
      isDeleted = true;
      avatarDelBtn.value = "Delete Avatar: True";
      isdeleteAvatar.value = "true";
      avatarDelBtn.style.backgroundColor = "#27ae60";
    }
  };

  avatarDelBtn.addEventListener("click", handleDelClicked);
};

if (editProfile) {
  init();
}
