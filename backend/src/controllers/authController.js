import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Verifica se o usuário já existe
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Criptografa a senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Cria o usuário
            const user = await User.create({ name, email, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Busca o usuário pelo e-mail
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Verifica a senha
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Gera o token JWT
            const token = generateToken(user);
            res.json({ token });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default AuthController;
