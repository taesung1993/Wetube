const sideHeaderOpenBtn = document.getElementById("SideHeaderOpen");
const SideHeaderCloseBtn = document.getElementById("SideHeaderClose");
const headerMenu = document.querySelector(".header__menu");

const openHeaderMenu = (event) => {
  headerMenu.style.display = "block";
  headerMenu.style.animation = "openMenu 0.3s forwards ease-in";
};

const closeHeaderMenu = (event) => {
  headerMenu.style.animation = "closeMenu 0.3s forwards linear";
  setTimeout(() => {
    headerMenu.style.display = "none";
  }, 400);
};

window.addEventListener("resize", (e) => {
  const currentWidth = e.currentTarget.innerWidth;
  if (currentWidth) {
    headerMenu.style.display = "none";
  }
});
sideHeaderOpenBtn.addEventListener("click", openHeaderMenu);
SideHeaderCloseBtn.addEventListener("click", closeHeaderMenu);
