const Joi = require('joi');

const createNoteSchema = Joi.object({
  title: Joi.string().required().trim().messages({
    'string.empty': 'Title cannot be empty'
  }),

  content: Joi.string().required().trim().messages({
    'string.empty': 'Content cannot be empty'
  })
});

const updateNoteSchema = Joi.object({
  title: Joi.string().min(1).max(200).optional().trim().messages({
    'string.empty': 'Title cannot be empty'
  }),

  content: Joi.string().optional().trim().messages({
    'string.empty': 'Content cannot be empty'
  })
})
  .min(1)
  .messages({
    'object.min':
      'At least one field (title or content) must be provided for update'
  });

module.exports = {
  createNoteSchema,
  updateNoteSchema
};
