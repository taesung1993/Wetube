export const home = (req, res) => {
  res.render("home", { pageTitle: "HOME" });
};

export const upload = (req, res) => {
  res.render("upload", { pageTitle: "UPLOAD" });
};

export const join = (req, res) => {
  res.render("join", { pageTitle: "JOIN" });
};

export const search = (req, res) => {
  res.render("search", { pageTitle: "SEARCH" });
};

export const login = (req, res) => {
  res.render("login", { pageTitle: "LOGIN" });
};
