const { body, validationResult } = require('express-validator');

const validateRequest =  (req, resp, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return resp.status(400).json({ message: 'Invalid request data', errors: errors.array() });


    }
    next();
} 

const registerValidationRules = [
    body('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateRequest,
]

const loginValidationRules = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateRequest,
] 

module.exports = {
    registerValidationRules,
    loginValidationRules
}