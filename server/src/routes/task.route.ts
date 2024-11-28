import express, { Router } from "express";
import {
  gettingSingleTaskController,
  taskCreationController,
  taskGettingController,
  taskUpdatingController,
} from "../controllers/task.controller";
import authorization from "../middlewares/authorization";

const router: Router = express.Router();

router
  .route("/")
  .post(authorization, taskCreationController)
  .get(authorization, taskGettingController);

router
  .route("/:id")
  .get(authorization, gettingSingleTaskController)
  .put(authorization, taskUpdatingController)
  .delete();

export default router;
