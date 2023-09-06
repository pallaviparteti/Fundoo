import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .min(3)
      .required(),
    password: Joi.string().min(3).max(15)
      .required(),
    city: Joi.string().min(3).optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ code: HttpStatus.BAD_REQUEST, message: `${error}` });
  } else {
    req.validatedBody = value;
    next();
  }
};
