import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'test_secret';
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export const generateToken = (user) => {
    if (!user || !user.id || !user.email) {
        throw new Error('Invalid user data for token generation');
    }

    return jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1d' }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw error;
    }
};
