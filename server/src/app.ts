import express, { Express } from "express";
import cors from "cors";
import userRouter from "./routes/user.route";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRouter);

export default app;
