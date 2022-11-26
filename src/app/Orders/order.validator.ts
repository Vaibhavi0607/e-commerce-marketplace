import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

export const addOrderValidator = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Validating order to add');
  const addOrderSchema = Joi.object({
    buyerId: Joi.string().alphanum().min(15),
    orderedProducts: Joi.string().alphanum().min(15),
  }).unknown(true);
  const result = addOrderSchema.validate(req);
  if (result.error) {
    logger.error('Error in validating order');
    return res.status(400).json({ message: result.error.message });
  }
  next();
};
