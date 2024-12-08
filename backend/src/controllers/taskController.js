import Task from '../models/Task.js';

class TaskController {
    static async getAllTasks(req, res) {
        try {
            const tasks = await Task.findAll();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching tasks' });
        }
    }

    static async createTask(req, res) {
        try {
            const { title, description, status } = req.body;
            const task = await Task.create({ title, description, status });
            return res.status(201).json(task);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error creating task' });
        }
    }

    static async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { title, description, status } = req.body;
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            await task.update({ title, description, status });
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Error updating task' });
        }
    }

    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            await task.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting task' });
        }
    }

    static async updateTaskStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }

            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }

            await task.update({ status });
            res.json({ message: 'Status updated successfully', task });
        } catch (error) {
            console.error('Error updating task status:', error);
            res.status(500).json({ error: 'Error updating task status' });
        }
    }
}

export default TaskController;
