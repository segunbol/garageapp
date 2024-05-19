import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "node:process";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import logger from "logger";

// import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();
const MONGO = process.env.MONGODB_URI!;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

// Create an instance of express
const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Define routes and middleware
// Example:
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello -Start  World!");
// });
app.use("/resources", express.static("src/public"));
app.use(
  "/publicfiles/uploads",
  express.static(__dirname + "./publicfiles/uploads")
);
// app.use(errorMiddleware);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello -Start  World!");
});

const API_URL = process.env.API_URL!; 


// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
