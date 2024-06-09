import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "node:process";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './controllers/swaggerDocumentation'
import { Doc } from "./controllers/swaggerDocments";
// import swaggerDocument from './swagger.json';


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



app.use("/resources", express.static("src/public"));
app.use(
  "/publicfiles/uploads",
  express.static(__dirname + "./publicfiles/uploads")
);


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Start World!");
});

// const API_URL = process.env.API_URL!; 

app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(Doc));
app.use(`/auth`, authRoutes );
app.use(`/users`, userRoutes );

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
