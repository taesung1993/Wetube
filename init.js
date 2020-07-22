import "./db";
import app from "./app";
import dotenv from "dotenv";

import "./models/Video";
import "./models/Comment";
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`✅ Listeoning on: http://localhost:${PORT}`)
);
