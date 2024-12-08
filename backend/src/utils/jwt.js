import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1d' } // Expira em 1 dia
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
