import Joi, { options } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateAddQuestion = ( req: Request, res: Response, next: NextFunction ) => {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    difficulty: Joi.string().valid('easy', 'medium', 'hard').required(),
    type: Joi.string().valid('Question Bank', 'Roadmap').required(),
    videoLink: Joi.string().uri().required(),
    question: Joi.string().required().trim(),
    answer: Joi.string().required().trim(),
    solution: Joi.string().required().trim(),
    options: Joi.array().items(Joi.string().trim()).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(401);
    console.log(error)
    throw next(new Error(error.details[0].message));
  }
  next();
};
