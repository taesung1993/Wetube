import passport from "passport";
import githubStrategy from "passport-github";
import googleStrategy from "passport-google-oauth20";
import User from "./models/User";
import routes from "./routes";
import {
  githubLoginCallback,
  googleLoginCallback,
} from "./controllers/globalController";

passport.use(User.createStrategy());
passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `https://secret-savannah-99819.herokuapp.com${routes.githubCb}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `http://localhost:9000${routes.googleCb}`,
    },
    googleLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
