import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import { postRouter, dalleRouter } from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// routes
app.use("/api/v1/post", postRouter);
app.use("/api/v1/dalle", dalleRouter);

app.get("/", (req, res) => {
  res.send("Hello from AI ImagiSphere!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(8080, () => console.log("Server has started on port: 8080"));
  } catch (err) {
    console.log(err);
  }
};

startServer();
