import {jest} from '@jest/globals';
import {Op} from 'sequelize';
import TaskController from '../../src/controllers/taskController.js';
import Task from '../../src/models/Task.js';

jest.mock('../../src/models/Task.js', () => ({
    __esModule: true,
    default: {
        findAll: jest.fn(),
        findAndCountAll: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('TaskController', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        jest.clearAllMocks();

        mockReq = {
            user: {id: 1},
            query: {page: 1, limit: 10},
            body: {},
            params: {},
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    it('deve retornar todas as tarefas do usuário', async () => {
        Task.findAndCountAll.mockResolvedValue({
            rows: [{id: 1, title: 'Task 1'}],
            count: 1,
        });

        await TaskController.getAllTasks(mockReq, mockRes);

        expect(Task.findAndCountAll).toHaveBeenCalledWith({
            where: {userId: 1},
            limit: 10,
            offset: 0,
            order: [['createdAt', 'DESC']],
        });
        expect(mockRes.json).toHaveBeenCalledWith({
            tasks: [{id: 1, title: 'Task 1'}],
            total: 1,
            page: 1,
            pages: 1,
        });
    });

    it('deve criar uma nova tarefa para o usuário', async () => {
        const newTask = {id: 2, title: 'New Task', userId: 1};
        mockReq.body = {title: 'New Task', description: 'Description'};
        Task.create.mockResolvedValue(newTask);

        await TaskController.createTask(mockReq, mockRes);

        expect(Task.create).toHaveBeenCalledWith({
            title: 'New Task',
            description: 'Description',
            status: undefined,
            userId: 1,
        });
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(newTask);
    });

    it('deve atualizar uma tarefa do usuário', async () => {
        const mockTask = {
            id: 1,
            title: 'Old Title',
            description: 'Task description',
            status: 'pending',
            userId: 1,
            update: jest.fn().mockImplementation((changes) => {
                Object.assign(mockTask, changes);
                return Promise.resolve(mockTask);
            }),
        };

        mockReq.params.id = 1;
        mockReq.body = {title: 'Updated Task', description: 'Task description', status: 'pending'};
        Task.findOne.mockResolvedValue(mockTask);

        await TaskController.updateTask(mockReq, mockRes);

        expect(Task.findOne).toHaveBeenCalledWith({where: {id: 1, userId: 1}});
        expect(mockTask.update).toHaveBeenCalledWith({
            title: 'Updated Task',
            description: 'Task description',
            status: 'pending'
        });
        expect(mockRes.json).toHaveBeenCalledWith(mockTask);
    });

    it('deve retornar erro 404 se a tarefa não for encontrada ao atualizar', async () => {
        mockReq.params.id = 999;
        mockReq.body = {title: 'Nonexistent Task'};
        Task.findOne.mockResolvedValue(null);

        await TaskController.updateTask(mockReq, mockRes);

        expect(Task.findOne).toHaveBeenCalledWith({where: {id: 999, userId: 1}});
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'Task not found'});
    });

    it('deve excluir uma tarefa do usuário', async () => {
        const mockTask = {
            destroy: jest.fn().mockResolvedValue(),
        };

        mockReq.params.id = 1;
        Task.findOne.mockResolvedValue(mockTask);

        await TaskController.deleteTask(mockReq, mockRes);

        expect(Task.findOne).toHaveBeenCalledWith({where: {id: 1, userId: 1}});
        expect(mockTask.destroy).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.send).toHaveBeenCalled();
    });

    it('deve retornar erro 404 se a tarefa não for encontrada ao excluir', async () => {
        mockReq.params.id = 999;
        Task.findOne.mockResolvedValue(null);

        await TaskController.deleteTask(mockReq, mockRes);

        expect(Task.findOne).toHaveBeenCalledWith({where: {id: 999, userId: 1}});
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'Task not found'});
    });

    it('deve retornar erro 500 em caso de falha ao excluir', async () => {
        mockReq.params.id = 1;
        Task.findOne.mockRejectedValue(new Error('Error deleting task'));

        await TaskController.deleteTask(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'Error deleting task'});
    });

    it('deve filtrar tarefas por título', async () => {
        mockReq.query.title = 'Task 1';

        Task.findAndCountAll.mockResolvedValue({
            rows: [{id: 1, title: 'Task 1'}],
            count: 1,
        });

        await TaskController.getAllTasks(mockReq, mockRes);

        expect(Task.findAndCountAll).toHaveBeenCalledWith({
            where: {
                userId: 1,
                title: {[Op.like]: '%Task 1%'},
            },
            limit: 10,
            offset: 0,
            order: [['createdAt', 'DESC']],
        });
        expect(mockRes.json).toHaveBeenCalledWith({
            tasks: [{id: 1, title: 'Task 1'}],
            total: 1,
            page: 1,
            pages: 1,
        });
    });

    it('deve atualizar o status de uma tarefa', async () => {
        const mockTask = {
            id: 1,
            status: 'pending',
            userId: 1,
            update: jest.fn().mockImplementation((changes) => {
                Object.assign(mockTask, changes);
                return Promise.resolve(mockTask);
            }),
        };

        mockReq.params.id = 1;
        mockReq.body = {status: 'completed'};

        Task.findOne.mockResolvedValue(mockTask);

        await TaskController.updateTaskStatus(mockReq, mockRes);

        expect(Task.findOne).toHaveBeenCalledWith({where: {id: 1, userId: 1}});
        expect(mockTask.update).toHaveBeenCalledWith({status: 'completed'});

        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Status updated successfully',
            task: {id: 1, status: 'completed', userId: 1},
        });
    });

    it('deve retornar erro 404 se a tarefa não for encontrada ao atualizar status', async () => {
        mockReq.params.id = 999;
        mockReq.body = {status: 'completed'};

        Task.findOne.mockResolvedValue(null);

        await TaskController.updateTaskStatus(mockReq, mockRes);

        expect(Task.findOne).toHaveBeenCalledWith({where: {id: 999, userId: 1}});
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: 'Task not found or not owned by the user',
        });
    });

    it('deve retornar erro 400 se o status estiver ausente ao atualizar', async () => {
        mockReq.params.id = 1;
        mockReq.body = {};

        await TaskController.updateTaskStatus(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'Status is required'});
    });
});
