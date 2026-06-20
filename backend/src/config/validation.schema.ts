import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_DRIVER: Joi.string().valid('postgres').default('postgres'),
  DATABASE_URL: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
});
