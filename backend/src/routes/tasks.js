import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.patch('/:id/status', TaskController.updateTaskStatus);

export default router;
