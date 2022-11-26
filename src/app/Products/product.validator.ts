import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

export const addProductValidator = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Validating product to add');
  const addProductSchema = Joi.object({
    body: {
      productName: Joi.string().required(),
      productDescription: Joi.string().required(),
      productPrice: Joi.number().min(1).required(),
      owner: Joi.string().alphanum().min(15).required(),
      catalogId: Joi.string().alphanum().min(15).required(),
    },
  }).unknown(true);
  const result = addProductSchema.validate(req);
  if (result.error) {
    logger.error('Error in validating to add product');
    return res.status(400).json({ message: result.error.message });
  }
  next();
};
