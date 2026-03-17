import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = { ...req.body, ...req.params, ...req.query };
      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        res.status(422).json({
          error: 'Validation failed',
          details: errors,
        });
        return;
      }
      next(error);
    }
  };
};
