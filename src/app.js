import "@babel/polyfill";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import routes from "./routes";
import session from "express-session";
import path from "path";
import morgan from "morgan";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import helmet from "helmet";
import passport from "passport";

import { globalRouter } from "./Routers/globalRouter";
import { videoRouter } from "./Routers/videoRouter";
import { userRouter } from "./Routers/userRouter";
import { localMiddles } from "./middlewares";

import "./passport";
import { apiRouter } from "./routers/apiRouter";

const app = express();
const cookieStore = mongoStore(session);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: false,
    store: new cookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/images", express.static(path.join(__dirname, "static")));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(localMiddles);
app.use(routes.home, globalRouter);
app.use(routes.video, videoRouter);
app.use(routes.user, userRouter);
app.use(routes.api, apiRouter);

export default app;
