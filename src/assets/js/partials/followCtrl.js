import axios from "axios";

const isFollowBtn = document.querySelector(".followBtn");

if (isFollowBtn) {
  const followNumEl = document.querySelector(".followerNum");
  const icon = isFollowBtn.querySelector(".icon i");
  const btnText = isFollowBtn.querySelector(".btn");
  const followString = "Follow";
  const unfollowString = "Unfollow";
  const bellIcon = "fas fa-bell";
  const bellSlashIcon = "fas fa-bell-slash";

  let isFollowing = false;
  let followNum = Number.isNaN(followNumEl.textContent * 1)
    ? 0
    : followNumEl.textContent * 1;

  const incrementFollow = async () => {
    // 구독 버튼이 있는 페이지는 videoDetail, userDetail 뿐이다.
    // videoDetail은 비디오 작성자로 가는 a태그의 href 속성을 이용해서
    // userId를 구할 수 있다.
    // 하지만, userDetail의 경우, 자신의 페이지로 가는 a태그가 따로 존재하지 않기 때문에
    // 사이트의 주소를 이용해서 userId를 추출한다.
    const profilelink = document.querySelector(".go-profile-link");
    const userId = profilelink
      ? profilelink.href.split("/user/")[1]
      : window.location.href.split(
          "https://secret-savannah-99819.herokuapp.com/user/"
        )[1];

    const res = await axios(`/api/user/${userId}/follow`, {
      method: "PUT",
      data: {
        success: true,
        willFollowId: userId,
      },
    });

    if (!res.data.success) {
      console.log(res.data.error);
    } else {
      followNum += 1;
      if (followNum == 1) {
        const followerText = document.querySelector(".followerText");
        followNumEl.textContent = followNum;
        followerText.textContent = "Follower";
      } else {
        const followerText = document.querySelector(".followerText");
        followNumEl.textContent = followNum;
        followerText.textContent = "Followers";
      }
    }
  };

  const decrementFollow = async () => {
    const profilelink = document.querySelector(".go-profile-link");
    const userId = profilelink
      ? profilelink.href.split("/user/")[1]
      : window.location.href.split(
          "https://secret-savannah-99819.herokuapp.com/user/"
        )[1];

    console.log(userId);
    const res = await axios(`/api/user/${userId}/follow`, {
      method: "DELETE",
      data: {
        success: true,
        willUnfollowId: userId,
      },
    });

    if (!res.data.success) {
      console.log(res.data.error);
    } else {
      followNum -= 1;
      if (followNum == 0) {
        const followerText = document.querySelector(".followerText");
        followNumEl.textContent = "No follower";
        followerText.textContent = "";
      } else if (followNum == 1) {
        const followerText = document.querySelector(".followerText");
        followNumEl.textContent = followNum;
        followerText.textContent = "Follower";
      } else {
        const followerText = document.querySelector(".followerText");
        followNumEl.textContent = followNum;
        followerText.textContent = "Followers";
      }
    }
  };

  const handleFollowBtn = (event) => {
    isFollowing = isFollowing ? false : true;
    if (isFollowing) {
      // 팔로우
      icon.className = bellSlashIcon;
      btnText.textContent = unfollowString;
      incrementFollow();
    } else {
      // 언 팔로우
      icon.className = bellIcon;
      btnText.textContent = followString;
      decrementFollow();
    }
  };

  const isFollowed = async () => {
    // 로그인한 유저가 비디오 게시자 또는
    // 어떤 userDetail 페이지에 접속했을 때
    // user의 팔로워가 맞는지 확인
    const profilelink = document.querySelector(".go-profile-link");
    const userId = profilelink
      ? profilelink.href.split("/user/")[1]
      : window.location.href.split(
          "https://secret-savannah-99819.herokuapp.com/user/"
        )[1];

    const res = await axios(`/api/user/${userId}/follow`, {
      method: "POST",
      data: {
        success: true,
        findId: userId,
      },
    });

    const isfollowed = res.data.isfollowed;

    if (isfollowed) {
      // follow 했던 것이 맞다면,
      // follow 버튼을 누른 것으로 간주
      isFollowing = true;
      icon.className = bellSlashIcon;
      btnText.textContent = unfollowString;
    }
  };
  const init = async () => {
    await isFollowed();
    isFollowBtn.addEventListener("click", handleFollowBtn);
  };
  init();
}
