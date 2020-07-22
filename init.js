import app from "./app";

const PORT = 8080;

app.listen(PORT, () =>
  console.log(`✅ Listeoning on: http://localhost:${PORT}`)
);
