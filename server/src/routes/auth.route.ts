import express, { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { authRateLimiter } from "../utils/rateLimiter";

const router: Router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterSchema:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password for the user account.
 *       required:
 *         - username
 *         - email
 *         - password
 *     LoginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password for the user account.
 *       required:
 *         - email
 *         - password
 */

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user.
 *     description: Create a new user account with a username, email, and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterSchema'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration successful!
 *                 data:
 *                   type: object
 *                   description: The registered user details.
 *       400:
 *         description: Validation error or user already exists.
 */
router.route("/register").post(authRateLimiter, registerController);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in an existing user.
 *     description: Authenticate a user with their email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful!
 *                 data:
 *                   type: object
 *                   description: The authenticated user details.
 *       401:
 *         description: Invalid email or password.
 */
router.route("/login").post(authRateLimiter, loginController);

export default router;
