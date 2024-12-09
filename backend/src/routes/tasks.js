import express from 'express';
import TaskController from '../controllers/taskController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateTask } from '../middleware/validateTask.js';
import {validateQuery} from "../middleware/validateQuery.js";

const router = express.Router();

router.use(authenticate);

router.get('/', validateQuery, TaskController.getAllTasks);
router.post('/', validateTask, TaskController.createTask);
router.patch('/:id', validateTask, TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.patch('/:id/status', TaskController.updateTaskStatus);

export default router;
