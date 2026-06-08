import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_DRIVER: Joi.string().valid('mongodb').default('mongodb'),
  DATABASE_URL: Joi.string().uri().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
});
