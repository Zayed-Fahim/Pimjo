import express, { Express } from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

export default app;
