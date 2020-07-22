export const videoDetail = (req, res) => {
  res.render("videoDetail", { pageTitle: "VIDEO DETAIL" });
};

export const editVideo = (req, res) => {
  res.render("editVideo", { pageTitle: "EDIT VIDEO" });
};

export const deleteVideo = (req, res) => {
  res.send("deleteVideo", { pageTitle: "DELETE VIDEO" });
};
