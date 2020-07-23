import dotenv from "dotenv";
import "./db";
import app from "./app";

import "./models/Video";
import "./models/Comment";
import "./models/User";
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`✅ Listeoning on: http://localhost:${PORT}`)
);
