import * as Joi from '@hapi/joi';

const configValidationSchema = Joi.object({
  STAGE: Joi.string().valid('dev', 'prod').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  SEND_GRID_KEY: Joi.string().required(),
});

export default configValidationSchema;
