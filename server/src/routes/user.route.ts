import express, { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/user.controller";

const router: Router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);

export default router;
