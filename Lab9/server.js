import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import courseRouter from "./routes/courseRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });

app.use("/api/courses", courseRouter);
