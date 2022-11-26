import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

export const registerUserValidator = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Validating user registeration');
  const registerUserSchema = Joi.object({
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      userType: Joi.string().required(),
      email: Joi.string().email().lowercase().required(),
      address: Joi.string(),
      catalog: Joi.array(),
    },
  }).unknown(true);
  const result = registerUserSchema.validate(req);
  if (result.error) {
    logger.error('Error in validating user registeration');
    return res.status(400).json({ message: result.error.message });
  }
  next();
};

export const userIdValidator = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Validating userid');
  const userIdSchema = Joi.object({
    params: {
      user_id: Joi.string().alphanum().min(15).required(),
    },
  }).unknown(true);
  const result = userIdSchema.validate(req);
  if (result.error) {
    logger.error('Error in validating user');
    return res.status(400).json({ message: result.error.message });
  }
  next();
};
