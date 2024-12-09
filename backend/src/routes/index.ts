import { Router } from 'express';
import * as authController from '../controllers/users/authController';
import * as userController from '../controllers/users/userController';
import * as serverController from '../controllers/server/serverController'; 
import * as taskController from '../controllers/tasks/taskController';
import { jwt, log } from '../middlewares';
import roles from '../middlewares/roles';

const routes = Router();

routes
    /**
     * @openapi
     * /info:
     *   get:
     *     summary: Info
     *     description: Info about the server. Only admin can use this route.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Returns if server is running.
     *       401:
     *         description: Returns if unauthorized.
     */
    .get("/info", log, jwt, roles([1]), serverController.info)
    /**
    * @openapi
    * /login:
    *   post:
    *     summary: Login
    *     description: Basic login route that returns JWT if success.
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - email
    *               - password
    *             properties:
    *               email:
    *                 type: string
    *               password:
    *                 type: string
    *     responses:
    *       200:
    *         description: Returns if user can login.
    *       400:
    *         description: Returns if bad request.
    *       401:
    *         description: Returns if unauthorized.
    */
    .post("/login", log, authController.login)
    /**
    * @openapi
    * /register:
    *   post:
    *     summary: Register
    *     description: Basic register route to create a new user and returns JWT if success.
    *     consumes:
    *       - application/json
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - email
    *               - password
    *               - name
    *               - rg
    *             properties:
    *               email:
    *                 type: string
    *               password:
    *                 type: string
    *               name:
    *                 type: string
    *               rg:
    *                 type: string
    *     responses:
    *       201:
    *         description: Returns if user was created and can login.
    *       400:
    *         description: Returns if bad request.
    *       401:
    *         description: Returns if unauthorized.
    */
    .post("/register", log, authController.register)
    /**
    * @openapi
    * /users:
    *   get:
    *     summary: List Users
    *     description: List all users.
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: Returns all users.
    *       404:
    *         description: Returns if users not found.
    */
    .get("/users", log, jwt, userController.list)
    /**
    * @openapi
    * /user:
    *   post:
    *     summary: Change User's Role
    *     description: Select if user is admin or client. This route is only for tests.
    *     security:
    *       - bearerAuth: []
    *     consumes:
    *       - application/json
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - role
    *             properties:
    *               role:
    *                 type: number
    *     responses:
    *       200:
    *         description: Returns if user's role was changed.
    *       400:
    *         description: Returns if bad request.
    *       404:
    *         description: Returns if user not found.
    */
    .post("/user", log, jwt, userController.update)
    /**
    * @openapi
    * /tasks:
    *   get:
    *     summary: List Tasks
    *     description: List all tasks.
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       200:
    *         description: Returns all tasks.
    *       404:
    *         description: Returns if tasks not found.
    */
    .get("/tasks", log, jwt, taskController.list)
    /**
    * @openapi
    * /task/{id}:
    *   get:
    *     summary: Find Task
    *     description: Describe task by id.
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *     responses:
    *       200:
    *         description: Returns task found.
    *       404:
    *         description: Returns if task not found.
    */
    .get("/task/:id", log, jwt, taskController.find)
    /**
    * @openapi
    * /task:
    *   post:
    *     summary: Create Task
    *     description: Create a new Task and return it.
    *     consumes:
    *       - application/json
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - name
    *               - description
    *               - priority
    *               - overdueAt
    *             properties:
    *               name:
    *                 type: string
    *               description:
    *                 type: string
    *               priority:
    *                 type: number
    *               overdueAt:
    *                 type: date
    *     responses:
    *       201:
    *         description: Returns if task was created.
    *       400:
    *         description: Returns if bad request.
    *       404:
    *         description: Returns if user not found.
    */
    .post("/task", log, jwt, roles([1]), taskController.create)
    /**
    * @openapi
    * /task/{id}:
    *   put:
    *     summary: Update Task
    *     description: Update a Task and return it.
    *     consumes:
    *       - application/json
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - name
    *               - description
    *               - priority
    *               - overdueAt
    *               - isFinished
    *             properties:
    *               name:
    *                 type: string
    *               description:
    *                 type: string
    *               priority:
    *                 type: number
    *               overdueAt:
    *                 type: date
    *               isFinished:
    *                 type: boolean
    *     responses:
    *       201:
    *         description: Returns if task was created.
    *       400:
    *         description: Returns if bad request.
    *       404:
    *         description: Returns if user not found.
    */
    .put("/task/:id", log, jwt, taskController.update)
    /**
    * @openapi
    * /task/{id}:
    *   delete:
    *     summary: Delete Task
    *     description: Delete a Task.
    *     consumes:
    *       - application/json
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *     responses:
    *       200:
    *         description: Returns if task was deleted.
    *       404:
    *         description: Returns if user not found.
    */
    .delete("/task/:id", log, jwt, roles([1]), taskController.del)


export default routes;