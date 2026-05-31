const { body, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    res.status(400).json({ success: false, errors: errors.array() });
  };
};

const userValidation = {
  register: [
    body('name').notEmpty().withMessage('Name is required').isLength({ max: 50 }),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
  ],
  login: [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ]
};

const taskValidation = {
  create: [
    body('title').notEmpty().isLength({ max: 200 }),
    body('dueDate').optional().isISO8601(),
    body('priority').isIn(['low', 'medium', 'high', 'urgent']),
    body('status').isIn(['todo', 'in-progress', 'review', 'done'])
  ]
};

module.exports = { validate, userValidation, taskValidation };
