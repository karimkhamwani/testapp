const Joi = require('joi');


const createNoteSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(200)
    .required()
    .trim()
    .messages({
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 1 character long',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required'
    }),
  
  content: Joi.string()
    .min(1)
    .max(5000)
    .required()
    .trim()
    .messages({
      'string.empty': 'Content cannot be empty',
      'string.min': 'Content must be at least 1 character long',
      'string.max': 'Content cannot exceed 5000 characters',
      'any.required': 'Content is required'
    })
});


const updateNoteSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(200)
    .optional()
    .trim()
    .messages({
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 1 character long',
      'string.max': 'Title cannot exceed 200 characters'
    }),
  
  content: Joi.string()
    .min(1)
    .max(5000)
    .optional()
    .trim()
    .messages({
      'string.empty': 'Content cannot be empty',
      'string.min': 'Content must be at least 1 character long',
      'string.max': 'Content cannot exceed 5000 characters'
    })
}).min(1).messages({
  'object.min': 'At least one field (title or content) must be provided for update'
});

module.exports = {
  createNoteSchema,
  updateNoteSchema
};
