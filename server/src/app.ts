import express, { Express } from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

export default app;
