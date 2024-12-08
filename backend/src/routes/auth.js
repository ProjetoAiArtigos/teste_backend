import express from 'express';
import AuthController from '../controllers/authController.js';
import { validateUserRegistration, validateUserLogin } from '../middleware/validateUser.js';

const router = express.Router();

router.post('/register', validateUserRegistration, AuthController.register);
router.post('/login', validateUserLogin, AuthController.login);

export default router;
