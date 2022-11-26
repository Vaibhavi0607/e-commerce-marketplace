import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

export const addCatalogValidator = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Validating catalog for seller');
  const addCatalogSchema = Joi.object({
    userId: Joi.string().alphanum().min(15),
    userType: Joi.string(),
  }).unknown(true);
  const result = addCatalogSchema.validate(req);
  if (result.error) {
    logger.error('Error in validating catalog for seller');
    return res.status(400).json({ message: result.error.message });
  }
  next();
};
