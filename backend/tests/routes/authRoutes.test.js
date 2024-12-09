import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';
import User from '../../src/models/User.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

jest.mock('../../src/models/User.js', () => ({
    __esModule: true,
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn((password) => Promise.resolve(`hashed_${password}`)),
    compare: jest.fn((password, hashedPassword) =>
        Promise.resolve(hashedPassword === `hashed_${password}`)
    ),
}));

describe('Auth Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Mock findOne
        User.findOne.mockImplementation(({ where: { email } }) => {
            if (email === 'existing@example.com') {
                return Promise.resolve({
                    id: 1,
                    name: 'Existing User',
                    email,
                    password: 'hashed_password',
                });
            }
            return Promise.resolve(null);
        });

        // Mock create
        User.create.mockImplementation(({ name, email, password }) => {
            return Promise.resolve({
                id: 2,
                name,
                email,
                password,
            });
        });
    });

    it('deve registrar um novo usuário', async () => {
        const res = await request(app).post('/auth/register').send({
            name: 'New User',
            email: 'newuser@example.com',
            password: 'password123',
        });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User registered successfully');
        expect(res.body.user).toHaveProperty('id', 2);
        expect(User.create).toHaveBeenCalledWith({
            name: 'New User',
            email: 'newuser@example.com',
            password: 'hashed_password123',
        });
    });

    it('deve retornar erro se o e-mail já existir', async () => {
        const res = await request(app).post('/auth/register').send({
            name: 'Existing User',
            email: 'existing@example.com',
            password: 'password123',
        });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('User already exists');
        expect(User.create).not.toHaveBeenCalled();
    });

    it('deve retornar um token para login válido', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'existing@example.com',
            password: 'password',
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');

        const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET || 'test_secret');
        expect(decoded).toMatchObject({ id: 1, email: 'existing@example.com' });
    });

    it('deve retornar erro para credenciais inválidas', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'existing@example.com',
            password: 'wrongpassword',
        });

        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Invalid credentials');
    });

    it('deve retornar erro 500 se houver falha no banco de dados durante o registro', async () => {
        User.create.mockRejectedValue(new Error('Database error'));

        const res = await request(app).post('/auth/register').send({
            name: 'New User',
            email: 'newuser@example.com',
            password: 'password123',
        });

        expect(res.status).toBe(500);
        expect(res.body.error).toBe('Internal Server Error');
    });

});
