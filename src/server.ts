import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "node:process";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
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

const swaggerOptions = {
  swaggerDefinition:{
    openapi: "3.0.0",
    info: {
      version: '1.0.0',
      title: 'Simple Swagger Setup',
      description: 'A simple swagger document',
      contact:{
        name: 'ExtraMortal',
      },
      servers: ["http://localhost:3000"],
    },
    schemes: ['http', 'https']
  },
  apis: ["./routes/*.ts"]
}

const swaggerDoc = swaggerJSDoc(swaggerOptions)
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDoc));



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

const API_URL = process.env.API_URL!; 

app.use(`${API_URL}/auth`, authRoutes );

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
