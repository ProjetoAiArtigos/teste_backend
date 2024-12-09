import { generateToken, verifyToken } from '../../src/utils/jwt.js';
import jwt from 'jsonwebtoken';

describe('JWT Utils', () => {
    const mockUser = { id: 1, email: 'user@example.com' };

    beforeAll(() => {
        // Define o segredo para os testes
        process.env.JWT_SECRET = 'test_secret';
    });

    it('deve gerar um token válido', () => {
        const token = generateToken(mockUser);
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
    });

    it('deve verificar um token válido', () => {
        const token = generateToken(mockUser);
        const decoded = verifyToken(token);
        expect(decoded).toHaveProperty('id', mockUser.id);
        expect(decoded).toHaveProperty('email', mockUser.email);
    });

    it('deve lançar um erro para um token expirado', done => {
        const expiredToken = jwt.sign(mockUser, process.env.JWT_SECRET, { expiresIn: '10ms' });
        setTimeout(() => {
            expect(() => verifyToken(expiredToken)).toThrow(/jwt expired/);
            done();
        }, 20);
    });
});
