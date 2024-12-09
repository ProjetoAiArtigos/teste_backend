import {jest} from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';
import Task from '../../src/models/Task.js';

jest.mock('../../src/models/User.js', () => ({
    __esModule: true,
    default: {
        findByPk: jest.fn().mockResolvedValue({id: 1, name: 'Mocked User'}),
    },
}));

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

jest.mock('../../src/utils/jwt.js', () => ({
    __esModule: true,
    generateToken: jest.fn(() => 'mockToken'),
    verifyToken: jest.fn(() => ({id: 1})),
}));

const token = 'mockToken';

describe('Task Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /tasks', () => {
        it('deve retornar todas as tarefas do usuário', async () => {
            Task.findAndCountAll.mockResolvedValue({
                rows: [{id: 1, title: 'Task 1'}],
                count: 1,
            });

            const res = await request(app)
                .get('/tasks')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.tasks).toHaveLength(1);
            expect(res.body.tasks[0]).toHaveProperty('title', 'Task 1');
        });

        it('deve retornar erro 401 se o token estiver ausente', async () => {
            const res = await request(app).get('/tasks');

            expect(res.status).toBe(401);
            expect(res.body.error).toBe('Authorization header missing');
        });
    });

    describe('POST /tasks', () => {
        it('deve criar uma nova tarefa para o usuário', async () => {
            const newTask = {id: 1, title: 'Task 1', userId: 1};
            Task.create.mockResolvedValue(newTask);

            const res = await request(app)
                .post('/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Task 1'});

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id', newTask.id);
            expect(Task.create).toHaveBeenCalledWith({title: 'Task 1', userId: 1});
        });

        it('deve retornar erro 400 se faltar título', async () => {
            const res = await request(app)
                .post('/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({});

            expect(res.status).toBe(400);
            expect(res.body.errors[0].msg).toBe('Title is required');
        });
    });

    describe('PUT /tasks/:id', () => {
        it('deve atualizar uma tarefa existente', async () => {
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

            Task.findOne.mockResolvedValue(mockTask);

            const res = await request(app)
                .put('/tasks/1')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Updated Task', description: 'Task description', status: 'pending'});

            expect(res.status).toBe(200);
            expect(Task.findOne).toHaveBeenCalledWith({where: {id: '1', userId: 1}});
            expect(mockTask.update).toHaveBeenCalledWith({
                title: 'Updated Task',
                description: 'Task description',
                status: 'pending'
            });
            expect(res.body).toHaveProperty('id', 1);
            expect(res.body).toHaveProperty('title', 'Updated Task');

        });


        it('deve retornar 404 se a tarefa não for encontrada', async () => {
            Task.findOne.mockResolvedValue(null);

            const res = await request(app)
                .put('/tasks/1')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Updated Task 1'});

            expect(res.status).toBe(404);
            expect(res.body.error).toBe('Task not found');
        });
    });


    describe('DELETE /tasks/:id', () => {
        it('deve excluir uma tarefa existente', async () => {
            Task.findOne.mockResolvedValue({id: 1, destroy: jest.fn()});

            const res = await request(app)
                .delete('/tasks/1')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(204);
            expect(Task.findOne).toHaveBeenCalledWith({where: {id: '1', userId: 1}});
        });

        it('deve retornar 404 se a tarefa não for encontrada', async () => {
            Task.findOne.mockResolvedValue(null);

            const res = await request(app)
                .delete('/tasks/1')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(404);
            expect(res.body.error).toBe('Task not found');
        });
    });

    describe('PATCH /tasks/:id/status', () => {
        it('deve atualizar o status da tarefa', async () => {
            Task.findOne.mockResolvedValue({id: 1, status: 'pending', update: jest.fn()});

            const res = await request(app)
                .patch('/tasks/1/status')
                .set('Authorization', `Bearer ${token}`)
                .send({status: 'completed'});

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Status updated successfully');
            expect(Task.findOne).toHaveBeenCalledWith({where: {id: '1', userId: 1}});
        });

        it('deve retornar erro 400 se o status estiver ausente', async () => {
            const res = await request(app)
                .patch('/tasks/1/status')
                .set('Authorization', `Bearer ${token}`)
                .send({});

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Status is required');
        });
    });
});
