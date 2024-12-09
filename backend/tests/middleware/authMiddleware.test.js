import { jest } from '@jest/globals';
import { authenticate } from '../../src/middleware/authMiddleware.js';
import User from '../../src/models/User.js';
import { generateToken, verifyToken } from '../../src/utils/jwt.js';

// Mock do modelo User
jest.mock('../../src/models/User.js', () => ({
    __esModule: true,
    default: {
        findByPk: jest.fn(),
    },
}));

// Mock do utilitário JWT
jest.mock('../../src/utils/jwt.js', () => ({
    __esModule: true,
    generateToken: jest.fn(({ id, email }) => `mocked_token_for_${id}_${email}`),
    verifyToken: jest.fn(),
}));

describe('AuthMiddleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock das dependências
        User.findByPk.mockResolvedValue({
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
        });

        mockReq = {
            headers: { authorization: '' },
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it('deve autenticar o usuário com token válido', async () => {
        const validUser = { id: 1, email: 'test@example.com' };
        const token = generateToken(validUser);

        mockReq.headers.authorization = `Bearer ${token}`;
        verifyToken.mockReturnValue(validUser);

        await authenticate(mockReq, mockRes, mockNext);

        expect(User.findByPk).toHaveBeenCalledWith(1);
        expect(mockReq.user).toEqual({ id: 1, name: 'Test User', email: 'test@example.com' });
        expect(mockNext).toHaveBeenCalled();
    });

    it('deve retornar erro 401 se o token for inválido', async () => {
        mockReq.headers.authorization = 'Bearer invalid_token';
        verifyToken.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        await authenticate(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve retornar erro 401 se o token for malformado', async () => {
        mockReq.headers.authorization = 'Bearer malformed_token';
        verifyToken.mockImplementation(() => {
            throw new Error('jwt malformed');
        });

        await authenticate(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve retornar erro 401 se o cabeçalho Authorization estiver ausente', async () => {
        mockReq.headers.authorization = '';

        await authenticate(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Authorization header missing' });
        expect(mockNext).not.toHaveBeenCalled();
    });
});
