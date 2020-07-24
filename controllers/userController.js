export const meDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "USER DETAIL", me: req.user });
};

export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "USER DETAIL" });
};

export const editProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "EDIT PROFILE" });
};

export const changePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
};
