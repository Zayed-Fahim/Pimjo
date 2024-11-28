import express, { Router } from "express";
import {
  gettingSingleTaskController,
  taskCreationController,
  taskDeletingController,
  taskGettingController,
  taskUpdatingController,
} from "../controllers/task.controller";
import authorization from "../middlewares/authorization";

const router: Router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - status
 *         - priority
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the task in ISO 8601 format
 *         status:
 *           type: string
 *           enum: [Pending, In Progress, Completed]
 *           description: The status of the task
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 *           description: The priority of the task
 *         userId:
 *           type: string
 *           description: The user ID associated with the task
 */

/**
 * @openapi
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Requires a valid JWT token to create a new task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The task title
 *                 example: 'New Task'
 *               description:
 *                 type: string
 *                 description: The task description
 *                 example: 'This is a new task'
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date for the task
 *                 example: '2024-12-31T23:59:59Z'
 *               status:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *                 default: 'Pending'
 *                 description: The task status
 *                 example: 'Pending'
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 default: 'Low'
 *                 description: The task priority
 *                 example: 'Medium'
 *               userId:
 *                 type: string
 *                 description: The ID of the user to whom the task belongs
 *                 example: 'user12345'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.route("/").post(authorization, taskCreationController);

/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks for the authorized user
 *     description: This endpoint retrieves all tasks for the currently authenticated user based on the provided authorization token.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks for the authorized user
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
 *                   example: "Tasks retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized. The user needs to provide a valid token.
 *       500:
 *         description: Server error
 */
router.route("/").get(authorization, taskGettingController);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     description: Fetch the details of a specific task using its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # This ensures the route requires the Bearer token for authorization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the task details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The task ID.
 *                 title:
 *                   type: string
 *                   description: The task title.
 *                 description:
 *                   type: string
 *                   description: The task description.
 *                 dueDate:
 *                   type: string
 *                   description: The due date of the task.
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   description: The current status of the task.
 *                   enum: [Pending, In Progress, Completed]
 *                 priority:
 *                   type: string
 *                   description: The priority level of the task.
 *                   enum: [Low, Medium, High]
 *                 userId:
 *                   type: string
 *                   description: The ID of the user assigned to the task.
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       404:
 *         description: Task not found. The task with the specified ID does not exist.
 *       500:
 *         description: Internal server error.
 */
router.route("/:id").get(authorization, gettingSingleTaskController);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update the details of a specific task using its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # Requires a Bearer token for authorization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task.
 *                 example: "Complete project documentation"
 *               description:
 *                 type: string
 *                 description: The description of the task.
 *                 example: "Write detailed documentation for the project."
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date of the task.
 *                 example: "2024-12-01T12:00:00Z"
 *               status:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *                 description: The current status of the task.
 *                 example: "In Progress"
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 description: The priority level of the task.
 *                 example: "High"
 *     responses:
 *       200:
 *         description: Successfully updated the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The task ID.
 *                 title:
 *                   type: string
 *                   description: The updated title of the task.
 *                 description:
 *                   type: string
 *                   description: The updated description of the task.
 *                 dueDate:
 *                   type: string
 *                   description: The updated due date of the task.
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   description: The updated status of the task.
 *                   enum: [Pending, In Progress, Completed]
 *                 priority:
 *                   type: string
 *                   description: The updated priority of the task.
 *                   enum: [Low, Medium, High]
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       404:
 *         description: Task not found. The task with the specified ID does not exist.
 *       400:
 *         description: Invalid request. The provided data may be incomplete or invalid.
 *       500:
 *         description: Internal server error.
 */

router.route("/:id").put(authorization, taskUpdatingController);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Delete a specific task using its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # This ensures the route requires the Bearer token for authorization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the task.
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       404:
 *         description: Task not found. The task with the specified ID does not exist.
 *       500:
 *         description: Internal server error.
 */
router.route("/:id").delete(authorization, taskDeletingController);

export default router;
