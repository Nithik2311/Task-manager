const Joi = require('joi');

const taskValidationSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(200)
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title cannot exceed 200 characters'
    }),
  description: Joi.string()
    .optional()
    .max(1000)
    .messages({
      'string.max': 'Description cannot exceed 1000 characters'
    }),
  status: Joi.string()
    .required()
    .valid('pending', 'in-progress', 'completed')
    .messages({
      'string.empty': 'Status is required',
      'any.only': 'Status must be one of: pending, in-progress, completed'
    })
}).required();

const validateTask = (req, res, next) => {
  try {
    const { error, value } = taskValidationSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        details: error.details.map(d => ({
          field: d.path[0],
          message: d.message
        }))
      });
    }
    
    req.validatedData = value;
    next();
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Validation error',
      error: err.message
    });
  }
};

const paginationValidation = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Page number must be greater than 0'
      });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({
        status: 'error',
        message: 'Limit must be between 1 and 100'
      });
    }

    req.pagination = { page, limit };
    next();
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Pagination validation error',
      error: err.message
    });
  }
};

module.exports = {
  validateTask,
  paginationValidation
};
