import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};

