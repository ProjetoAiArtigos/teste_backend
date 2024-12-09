import { query, validationResult } from 'express-validator';

export const validateQuery = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('sortBy').optional().isString().withMessage('SortBy must be a string'),
    query('order')
        .optional()
        .isIn(['ASC', 'DESC'])
        .withMessage('Order must be one of: ASC, DESC'),
    query('status')
        .optional()
        .isIn(['pending', 'in progress', 'completed'])
        .withMessage('Status must be one of: pending, in progress, completed'),
    query('title').optional().isString().withMessage('Title must be a string'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
