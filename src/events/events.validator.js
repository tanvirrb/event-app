const Joi = require('joi');
const validationMessage = require('../helpers/validationMessageFormatter');

module.exports.getEventsValidator = (req, res, next) => {
    const schema = Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
      pageNumber: Joi.number().required().integer().min(1).default(1),
        pageSize: Joi.number().required().integer().min(1).default(5),
    });

    const { error } = schema.validate(req.query);
    if (error) {
        const message = validationMessage(error?.details);
        return res.status(400).json({ error: message });
    }
    next();
};
module.exports.createEventValidator = (req, res, next) => {
  const schema = Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = validationMessage(error?.details);
    return res.status(400).json({ error: message });
  }
  next();
};

module.exports.updateEventValidator = (req, res, next) => {
  const schema = Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
    name: Joi.string(),
    location: Joi.string(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = validationMessage(error?.details);
    return res.status(400).json({ error: message });
  }
  next();
};
