import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import pick from '../utils/pick';

/**
 * Return a middleware that validates the data sent in the request
 * @param {Record<string, Joi.AnySchema>} schema 
 * @returns 
 */
const validate =
  (schema: Record<string, Joi.AnySchema>) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      const validSchema = pick(schema, ['params', 'query', 'body']);
      const object = pick(req, Object.keys(validSchema));
      const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object, {
          abortEarly: false,
        });

      if (error) {
        return next(error);
      }
      Object.assign(req, value);
      return next();
    };

export default validate;
