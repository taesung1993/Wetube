import express from "express";
import routes from "./routes";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import { globalRouter } from "./Routers/globalRouter";
import { videoRouter } from "./Routers/videoRouter";
import { userRouter } from "./Routers/userRouter";
import { localMiddles } from "./middlewares";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.set("view engine", "pug");

app.use(localMiddles);
app.use(routes.home, globalRouter);
app.use(routes.video, videoRouter);
app.use(routes.user, userRouter);

export default app;
