const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.craftValidSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().valid(
    'jewelry',
    'prints',
    'clothing',
    'ceramics',
    'plants'
  ),
  image: Joi.string().required(),
  price: Joi.number().required().min(0.01),
  stock: Joi.number().required(),
  description: Joi.string().required(),
});

module.exports.cartValidSchema = Joi.object({
  craftId: Joi.objectId().required(),
  quantity: Joi.number().required().min(1),
});
