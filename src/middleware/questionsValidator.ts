import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateAddQuestions = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      level: Joi.number().integer().min(1).max(10).required(),
      uploadTo: Joi.string().required(),
      questionType: Joi.string().valid('Numerical', 'MCQ').required(),
      videoLink: Joi.string().optional().default('#'),
      question: Joi.string().required(),
      solution: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),
      topic: Joi.string().required(),
      chapter: Joi.string().required(),
      answer: Joi.alternatives().conditional('questionType', {
        is: 'Numerical',
        then: Joi.number().required(),
        otherwise: Joi.array().items(Joi.string()).required(),
      }),
      options: Joi.when('questionType', {
        is: 'MCQ',
        then: Joi.array()
          .items(
            Joi.object({
              id: Joi.number().required(),
              content: Joi.string().required(),
              isCorrect: Joi.boolean().required(),
            }),
          )
          .required(),
        otherwise: Joi.forbidden(),
      }),
    }),
  );

  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return next(new Error(error.details[0].message)); 
  }

  next();
};
