import express, { urlencoded } from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/users.js'
import taskRoutes from './routes/task.js'
import cookieParser from 'cookie-parser';
import { errorHandlerFunc } from './middleWare/error.js';
import connectDB from "./models/connection.js"
import cors from 'cors'

const app = express();



config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
console.log(process.env.FRONTEND_URL);

// Using routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.use(errorHandlerFunc)

app.get("/", (req, res) => {
  res.send("Namaskar🙏");
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.FRONTEND_URL}`);
}); 