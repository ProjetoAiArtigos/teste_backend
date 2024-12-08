import { body, validationResult } from 'express-validator';

export const validateTask = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('status')
        .optional()
        .isIn(['pending', 'in progress', 'completed'])
        .withMessage('Status must be one of: pending, in progress, completed'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
