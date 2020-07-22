import routes from "./routes";

export const localMiddles = (req, res, next) => {
  res.locals.siteName = "WETUBE";
  res.locals.routes = routes;
  next();
};
